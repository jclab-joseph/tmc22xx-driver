import SerialPort from 'serialport';
import * as events from 'events';
import * as util from 'util';

import * as regs from './regs';

export interface TMC220XDriverConfig {
  path: string;
  serialOptions?: SerialPort.OpenOptions;
  slaveAddress: number;
}

export interface TMC220XDriverInterface extends events.EventEmitter {
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: 'open', listener: (err: any) => void): this;
  on(eventName: 'close', listener: (err: any) => void): this;
}

export type ErrorHandler = (err: any) => void;
export type SendHandler = ((err: null, data: Buffer) => void) & ((err: Error, data?: null) => void);

const TMC2208_SYNC = 0x05;
const TMC2208_REV = 0x00;
const TMC2208_WRITE = 0x80;
const TMC2208_READ = 0x00;

interface ReadHandler {
  ignoreLength: number;
  readMode: boolean;
  buffer: Buffer | null;
  cb: (err: any, data: Buffer | null) => void;
  timer: NodeJS.Timeout | null;
}

export interface DrvStatusResp {
  stst: boolean;
  stealth: boolean;
  csActual: number;
  t157: boolean;
  t150: boolean;
  t143: boolean;
  t120: boolean;
  olb: boolean;
  ola: boolean;
  s2vsb: boolean;
  s2vsa: boolean;
  s2gb: boolean;
  s2ga: boolean;
  ot: boolean;
  otpw: boolean;
}

export class TMC220XDriver extends events.EventEmitter {
  private _config: TMC220XDriverConfig;
  private timeout: number;

  private _serialPort: SerialPort;
  private _registers: Record<number, number> = {};

  private _readHandler: ReadHandler | null = null;

  constructor(config: TMC220XDriverConfig) {
    super();
    this._config = config;
    this._serialPort = new SerialPort(config.path, {
      ...config.serialOptions,
      autoOpen: false
    });
    this.timeout = 3000;
  }

  private _afterOpen() {
    this._serialPort
        .on('error', (err) => {
          this.emit('error', err)
        });
  }

  open(cb: ErrorHandler): void;
  open(): Promise<void>;
  open(cb?: ErrorHandler): void | Promise<void> {
    if (!cb) {
      return util.promisify(this.open.bind(this))();
    }
    this._serialPort
        .on('data', (data: Buffer) => {
          console.log('raw data: ', data);
          const handler = this._readHandler;
          if (handler) {
            if (handler.ignoreLength) {
              const ignoreLength = Math.min(handler.ignoreLength, data.length);
              data = data.subarray(ignoreLength);
              handler.ignoreLength -= ignoreLength;
            }
            // console.log('handler.ignoreLength : ', {
            //   ignoreLength: handler.ignoreLength,
            //   readMode: handler.readMode,
            //   remainging: data
            // });
            if (handler.ignoreLength === 0) {
              if (handler.readMode) {
                if (data.length > 0) {
                  handler.cb(null, data);
                }
              } else {
                handler.cb(null, data);
              }
            }
          }
        })
        .open((err) => {
          if (!err) {
            this._afterOpen();
          }
          if (cb) {
            cb(err);
          }
          this.emit('open', err);
        });
  }

  close(cb: ErrorHandler): void;
  close(): Promise<void>;
  close(cb?: ErrorHandler): void | Promise<void> {
    if (!cb) {
      return util.promisify(this.close.bind(this))();
    }
    this._serialPort
        .close((err) => {
          if (cb) {
            cb(err);
          }
          this.emit('close', err);
        });
  }

  private _calcCrc(datagram: number[] | Buffer, length: number): number {
    let crc: number = 0;
    length -= 1; // crc
    for (let i = 0; i < length; i++) {
      let currentByte = datagram[i];
      for (let j = 0; j < 8; j++) {
        if ((crc >> 7) ^ (currentByte & 0x01)) {
          crc = ((crc << 1) ^ 0x07) & 0xFF;
        } else {
          crc = (crc << 1) & 0xFF;
        }
        currentByte = currentByte >> 1;
      }
    }
    return crc;
  }

  sendDatagram(registerAddress: number, writeMode: boolean, data: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const datagram: number[] = [
        TMC2208_SYNC | (TMC2208_REV << 4),
        this._config.slaveAddress,
        (registerAddress & 0x7f) | (writeMode ? TMC2208_WRITE : TMC2208_READ)
      ];
      if (writeMode) {
        datagram.push(
            (data >> 24) & 0xFF,
            (data >> 16) & 0xFF,
            (data >> 8) & 0xFF,
            (data >> 0) & 0xFF
        );
      }
      datagram.push(0);
      datagram[datagram.length - 1] = this._calcCrc(datagram, datagram.length);
      const readHandler: ReadHandler = {
        readMode: !writeMode,
        ignoreLength: datagram.length,
        buffer: null,
        cb: (err: any, data: Buffer | null) => {
          this._readHandler = null;
          if (readHandler.timer) {
            clearTimeout(readHandler.timer);
            readHandler.timer = null;
          }
          if (err) {
            reject(err);
            return ;
          }

          if (writeMode) {
            resolve(0);
            return ;
          }

          const received = data;
          const receivedCrc = received[received.length - 1];
          const computedCrc = this._calcCrc(received, received.length);
          if (receivedCrc != computedCrc) {
            reject(new Error('CRC Error'));
            return ;
          }
          if ((received[1] != 0xff) || (received[2] != registerAddress)) {
            reject(new Error('Protocol Error'));
            return ;
          }
          let receivedValue: number = 0;
          receivedValue |= (received[3] & 0xff) << 24;
          receivedValue |= (received[4] & 0xff) << 16;
          receivedValue |= (received[5] & 0xff) << 8;
          receivedValue |= (received[6] & 0xff) << 0;
          resolve(receivedValue);
        },
        timer: null
      };
      this._readHandler = readHandler;
      this._serialPort.write(datagram, (err) => {
        if (err) {
          readHandler.cb(err, null);
        } else {
          readHandler.timer = setTimeout(() => readHandler.cb(new Error('Timeout'), null), this.timeout);
        }
      });
    });
  }

  regMod(registerAddress: number, regDef: Readonly<regs.RegDef>, value: number, lazy?: boolean): Promise<void> {
    return Promise.resolve()
        .then(() => {
          let regValue: number | undefined = this._registers[registerAddress];
          if (typeof regValue === 'undefined') {
            return this.sendDatagram(registerAddress, false, 0);
          }
          return regValue;
        })
        .then((regValue) => {
          regValue &= ~regDef.bm;
          regValue |= value << regDef.bp;
          if (lazy) {
            this._registers[registerAddress] = regValue;
          } else {
            return this.sendDatagram(registerAddress, true, regValue)
                .then(() => {
                  this._registers[registerAddress] = regValue;
                });
          }
        });
  }

  regSet(registerAddress: number, value: number): Promise<void> {
    return this.sendDatagram(registerAddress, true, value)
        .then(() => {
          this._registers[registerAddress] = value;
        });
  }

  regGet(register: regs.REGISTERS): Promise<number> {
    return this.sendDatagram(register, false, 0);
  }

  drvStatus(): Promise<DrvStatusResp> {
    return this.regGet(regs.REGISTERS.DRV_STATUS)
        .then((value) => ({
          otpw: !!(value & 0x00000001),
          ot: !!(value & 0x00000002),
          s2ga: !!(value & 0x00000004),
          s2gb: !!(value & 0x00000008),

          s2vsa: !!(value & 0x00000010),
          s2vsb: !!(value & 0x00000020),
          ola: !!(value & 0x00000040),
          olb: !!(value & 0x00000080),

          t120: !!(value & 0x00000100),
          t143: !!(value & 0x00000200),
          t150: !!(value & 0x00000400),
          t157: !!(value & 0x00000800),

          csActual: (value >> 16) & 0x1f,

          stealth: !!(value & 0x40000000),
          stst: !!(value & 0x80000000)
        }));
  }

  commitGconf(): Promise<void> {
    console.log('commit gconf: ', this._registers[regs.REGISTERS.GCONF].toString(2));
    return this.sendDatagram(regs.REGISTERS.GCONF, true, this._registers[regs.REGISTERS.GCONF])
        .then(() => {});
  }

  setGconfPdnDisable(value: boolean, lazy?: boolean): Promise<void> {
    return this.regMod(regs.REGISTERS.GCONF, regs.PDN_DISABLE, value ? 1 : 0, lazy);
  }

  setGconfCurrentScaleAnalog(value: boolean, lazy?: boolean): Promise<void> {
    return this.regMod(regs.REGISTERS.GCONF, regs.I_SCALE_ANALOG, value ? 1 : 0, lazy);
  }

  setToff(value: number): Promise<void> {
    return this.regMod(regs.REGISTERS.CHOPCONF, regs.TOFF, value);
  }

  setFreewheel(value: number): Promise<void> {
    return this.regMod(regs.REGISTERS.PWMCONF, regs.FREEWHEEL, value);
  }

  setVactual(value: number): Promise<void> {
    return this.regSet(regs.REGISTERS.VACTUAL, value & 0xffffff);
  }

  setCurrentHoldRun(iHold: number, iRun: number, iHoldDelay: number): Promise<void> {
    let value = 0;
    value |= iHold << regs.IHOLD.bp;
    value |= iRun << regs.IRUN.bp;
    value |= iHoldDelay << regs.IHOLDDELAY.bp;
    console.log('value ihold_irun:  ', value, value.toString(2));
    return this.regSet(regs.REGISTERS.IHOLD_IRUN, value);
  }
}
