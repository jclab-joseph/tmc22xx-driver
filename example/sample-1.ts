import {REGISTERS, TMC220XDriver} from '../src';

const driver = new TMC220XDriver({
  path: 'COM3',
  serialOptions: {
    baudRate: 57600
  },
  slaveAddress: 0
});

driver.open()
    .then(() => {
      console.log('OPEN');
      setInterval(() => {
        driver.drvStatus()
            .then((x) => console.log('driver status = ', x));
      }, 5000)
    })
    .then(() => driver.setGconfPdnDisable(true, true))
    .then(() => driver.setGconfCurrentScaleAnalog(false, true))
    .then(() => driver.commitGconf())
    .then(() => driver.setToff(2))
    .then(() => driver.setCurrentHoldRun(0, 24, 1))
    .then(() => driver.setFreewheel(2))
    .then((pwmconf) => {
      const regs: Record<string, any> = {};
      console.log('init ok');
      driver.regGet(REGISTERS.OTP_READ)
          .then((x) => regs.otpRead = x)
          .then(() => driver.regGet(REGISTERS.IOIN))
          .then((x) => regs.ioin = x.toString(2))
          .then(() => driver.regGet(REGISTERS.CHOPCONF))
          .then((x) => regs.chopconf = x.toString(2))
          .then(() => driver.regGet(REGISTERS.GCONF))
          .then((x) => regs.gconf = x.toString(2))
          .then(() => driver.regGet(REGISTERS.GSTAT))
          .then((x) => regs.gstat = x.toString(2))
          .then(() => driver.regGet(REGISTERS.IHOLD_IRUN))
          .then((x) => regs.IHOLD_IRUN = x.toString(2))
          .then(() => driver.regGet(REGISTERS.PWMCONF))
          .then((x) => {
            regs.pwmconf = (x & 0x7fffffff).toString(16);
            regs.freew = ((x >> 20) & 0x0f).toString(2);
          })
          .then(() => {
            console.log({
              ...regs
            });
          })
          .then(() => driver.setVactual(0))
          .then(() => driver.setVactual(16 * 200));
    })
    .catch((err) => {
      console.error('err: ', err);
    });
