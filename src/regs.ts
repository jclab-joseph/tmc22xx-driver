// Register memory positions
export const REG_GCONF = 0x00;
export const REG_GSTAT = 0x01;
export const REG_IFCNT = 0x02;
export const REG_SLAVECONF = 0x03;
export const REG_OTP_PROG = 0x04;
export const REG_OTP_READ = 0x05;
export const REG_IOIN = 0x06;
export const REG_FACTORY_CONF = 0x07;
export const REG_IHOLD_IRUN = 0x10;
export const REG_TPOWERDOWN = 0x11;
export const REG_TSTEP = 0x12;
export const REG_TPWMTHRS = 0x13;
export const REG_VACTUAL = 0x22;
export const REG_MSCNT = 0x6A;
export const REG_MSCURACT = 0x6B;
export const REG_CHOPCONF = 0x6C;
export const REG_DRV_STATUS = 0x6F;
export const REG_PWMCONF = 0x70;
export const REG_PWM_SCALE = 0x71;
export const REG_PWM_AUTO = 0x72;

export enum REGISTERS {
  GCONF = REG_GCONF,
  GSTAT = REG_GSTAT,
  IFCNT = REG_IFCNT,
  SLAVECONF = REG_SLAVECONF,
  OTP_PROG = REG_OTP_PROG,
  OTP_READ = REG_OTP_READ,
  IOIN = REG_IOIN,
  FACTORY_CONF = REG_FACTORY_CONF,
  IHOLD_IRUN = REG_IHOLD_IRUN,
  TPOWERDOWN = REG_TPOWERDOWN,
  TSTEP = REG_TSTEP,
  TPWMTHRS = REG_TPWMTHRS,
  VACTUAL = REG_VACTUAL,
  MSCNT = REG_MSCNT,
  MSCURACT = REG_MSCURACT,
  CHOPCONF = REG_CHOPCONF,
  DRV_STATUS = REG_DRV_STATUS,
  PWMCONF = REG_PWMCONF,
  PWM_SCALE = REG_PWM_SCALE,
  PWM_AUTO = REG_PWM_AUTO,
}

export interface RegDef {
  bp: number;
  bm: number;
}

// GCONF
export const I_SCALE_ANALOG_bp = 0;
export const INTERNAL_RSENSE_bp = 1;
export const EN_SPREADCYCLE_bp = 2;
export const SHAFT_bp = 3;
export const INDEX_OTPW_bp = 4;
export const INDEX_STEP_bp = 5;
export const PDN_DISABLE_bp = 6;
export const MSTEP_REG_SELECT_bp = 7;
export const MULTISTEP_FILT_bp = 8;
export const I_SCALE_ANALOG_bm = 0x1; // 0b1ul;
export const INTERNAL_RSENSE_bm = 0x2; // 0b10ul;
export const EN_SPREADCYCLE_bm = 0x4; // 0b100ul;
export const SHAFT_bm = 0x8; // 0b1000ul;
export const INDEX_OTPW_bm = 0x10; // 0b10000ul;
export const INDEX_STEP_bm = 0x20; // 0b100000ul;
export const PDN_DISABLE_bm = 0x40; // 0b1000000ul;
export const MSTEP_REG_SELECT_bm = 0x80; // 0b10000000ul;
export const MULTISTEP_FILT_bm = 0x100; // 0b100000000ul;
// GSTAT
export const RESET_bp = 0;
export const DRV_ERR_bp = 1;
export const UV_CP_bp = 2;
export const RESET_bm = 0x1; // 0b1ul;
export const DRV_ERR_bm = 0x2; // 0b10ul;
export const UV_CP_bm = 0x3; // 0b100ul;
// IFCNT
export const IFCNT_bp = 0;
export const IFCNT_bm = 0xff; // 0xFFul;
// SLAVECONF
export const SLAVECONF_bp = 0;
export const SLAVECONF_bm = 0xf00; // 0xF00ul;
export const SENDDELAY_bp = 8;
export const SENDDELAY_bm = 0xf00; // 0xF00ul;
// OTP_PROG
export const OTPBIT_bp = 0;
export const OTPBYTE_bp = 4;
export const OTPMAGIC_bp = 8;
export const OTPBIT_bm = 0x7; // 0b111ul;
export const OTPBYTE_bm = 0x30; // 0b110000ul;
export const OTPMAGIC_bm = 0xff00; // 0b1111111100000000ul;
// OTP_READ
export const OTP0_bp = 0;
export const OTP1_bp = 8;
export const OTP2_bp = 16;
export const OTP0_bm = 0xff; // 0xFFul;
export const OTP1_bm = 0xff00; // 0xFF00ul;
export const OTP2_bm = 0xff0000; // 0xFF0000ul;
// IOIN
export const ENN_bp = 0;
export const MS1_bp = 2;
export const MS2_bp = 3;
export const DIAG_bp = 4;
export const PDN_UART_bp = 6;
export const STEP_bp = 7;
export const SEL_A_bp = 8;
export const DIR_bp = 9;
export const VERSION_bp = 24;
export const ENN_bm = 0x1; // 0b1ul;
export const MS1_bm = 0x4; // 0b100ul;
export const MS2_bm = 0x8; // 0b1000ul;
export const DIAG_bm = 0x10; // 0b10000ul;
export const PDN_UART_bm = 0x40; // 0b1000000ul;
export const STEP_bm = 0x80; // 0b10000000ul;
export const SEL_A_bm = 0x100; // 0b100000000ul;
export const DIR_bm = 0x2000; // 0b1000000000ul;
export const VERSION_bm = 0xFF000000; // 0xFF000000ul;
// FACTORY_CONF
export const FCLKTRIM_bp = 0;
export const OTTRIM_bp = 8;
export const FCLKTRIM_bm = 0x1f; // 0x1Ful;
export const OTTRIM_bm = 0x300; // 0x300ul;
// IHOLD_IRUN
export const IHOLD_bp = 0;
export const IRUN_bp = 8;
export const IHOLDDELAY_bp = 16;
export const IHOLD_bm = 0x1F; // 0x1Ful;
export const IRUN_bm = 0x1F00; // 0x1F00ul;
export const IHOLDDELAY_bm = 0xF0000; // 0xF0000ul;
// TPOWERDOWN
export const TPOWERDOWN_bp = 0;
export const TPOWERDOWN_bm = 0xFF; // 0xFFul;
// MSCURACT
export const CUR_A_bp = 0;
export const CUR_B_bp = 16;
export const CUR_A_bm = 0x1FF; // 0x1FFul;
export const CUR_B_bm = 0x1FF0000; // 0x1FF0000ul;
// PWM_SCALE
export const PWM_SCALE_SUM_bp = 0;
export const PWM_SCALE_AUTO_bp = 16;
export const PWM_SCALE_SUM_bm = 0xFF; // 0xFFul;
export const PWM_SCALE_AUTO_bm = 0x1FF0000; // 0x1FF0000ul;
// PWM_AUTO
export const PWM_OFS_AUTO_bp = 0;
export const PWM_GRAD_AUTO_bp = 16;
export const PWM_OFS_AUTO_bm = 0xFF; // 0xFFul;
export const PWM_GRAD_AUTO_bm = 0xFF0000; // 0xFF0000ul;
// OTP_READ
export const OTP_FCLKTRIM_bp = 0;
export const OTP_OTTRIM_bp = 5;
export const OTP_INTERNALRSENSE_bp = 6;
export const OTP_TBL_bp = 7;
export const OTP_PWM_GRAD_bp = 8;
export const OTP_PWM_AUTOGRAD_bp = 12;
export const OTP_CHOPCONF_bp = 12;
export const OTP_TPWMTHRS_bp = 13;
export const OTP_PWM_OFS_bp = 16;
export const OTP_PWM_REG_bp = 17;
export const OTP_OTP_PWM_FREQ_bp = 18;
export const OTP_IHOLDDELAY_bp = 19;
export const OTP_IHOLD_bp = 21;
export const OTP_OTP_EN_SPREADCYCLE = 23;
// CHOPCONF
export const TOFF_bp = 0;
export const HSTRT_bp = 4;
export const HEND_bp = 7;
export const TBL_bp = 15;
export const VSENSE_bp = 17;
export const MRES_bp = 24;
export const INTPOL_bp = 28;
export const DEDGE_bp = 29;
export const DISS2G_bp = 30;
export const DISS2VS_bp = 31;
export const TOFF_bm = 0xF; // = 0xFul;
export const HSTRT_bm = 0x70; // = 0x70ul;
export const HEND_bm = 0x780; // = 0x780ul;
export const TBL_bm = 0x18000; // = 0x18000ul;
export const VSENSE_bm = 0x20000; // = 0x20000ul;
export const MRES_bm = 0xF000000; // = 0xF000000ul;
export const INTPOL_bm = 0x10000000; // = 0x10000000ul;
export const DEDGE_bm = 0x20000000; // = 0x20000000ul;
export const DISS2G_bm = 0x40000000; // = 0x40000000ul;
export const DISS2VS_bm = 0x80000000; // = 0x80000000ul;
// PWMCONF
export const PWM_OFS_bp = 0;
export const PWM_GRAD_bp = 8;
export const PWM_FREQ_bp = 16;
export const PWM_AUTOSCALE_bp = 18;
export const PWM_AUTOGRAD_bp = 19;
export const FREEWHEEL_bp = 20;
export const PWM_REG_bp = 24;
export const PWM_LIM_bp = 28;
export const PWM_OFS_bm = 0xFF; // = 0xFFul;
export const PWM_GRAD_bm = 0xFF00; // = 0xFF00ul;
export const PWM_FREQ_bm = 0x30000; // = 0x30000ul;
export const PWM_AUTOSCALE_bm = 0x40000; // = 0x40000ul;
export const PWM_AUTOGRAD_bm = 0x80000; // = 0x80000ul;
export const FREEWHEEL_bm = 0x300000; // = 0x300000ul;
export const PWM_REG_bm = 0xF000000; // = 0xF000000ul;
export const PWM_LIM_bm = 0xF0000000; // = 0xF0000000ul;
// DRV_STATUS
export const OTPW_bp = 0;
export const OT_bp = 1;
export const S2GA_bp = 2;
export const S2GB_bp = 3;
export const S2VSA_bp = 4;
export const S2VSB_bp = 5;
export const OLA_bp = 6;
export const OLB_bp = 7;
export const T120_bp = 8;
export const T143_bp = 9;
export const T150_bp = 10;
export const T157_bp = 11;
export const CS_ACTUAL_bp = 16;
export const STEALTH_bp = 30;
export const STST_bp = 31;
export const OTPW_bm = 0x1; // 0b1ul;
export const OT_bm = 0x2; // 0b10ul;
export const S2GA_bm = 0x4; // 0b100ul;
export const S2GB_bm = 0x8; // 0b1000ul;
export const S2VSA_bm = 0x10; // 0b10000ul;
export const S2VSB_bm = 0x20; // 0b100000ul;
export const OLA_bm = 0x40; // 0b1000000ul;
export const OLB_bm = 0x80; // 0b10000000ul;
export const T120_bm = 0x100; // 0b100000000ul;
export const T143_bm = 0x200; // 0b1000000000ul;
export const T150_bm = 0x400; // 0b10000000000ul;
export const T157_bm = 0x800; // 0b100000000000ul;
export const CS_ACTUAL_bm = 0x1F0000; // = 0x1F0000ul;
export const STEALTH_bm = 0x40000000; // = 0x40000000ul;
export const STST_bm = 0x80000000; // = 0x80000000ul;

/********************/

export const I_SCALE_ANALOG: Readonly<RegDef> = Object.freeze({
  bp: I_SCALE_ANALOG_bp,
  bm: I_SCALE_ANALOG_bm
});
export const INTERNAL_RSENSE: Readonly<RegDef> = Object.freeze({
  bp: INTERNAL_RSENSE_bp,
  bm: INTERNAL_RSENSE_bm
});
export const EN_SPREADCYCLE: Readonly<RegDef> = Object.freeze({
  bp: EN_SPREADCYCLE_bp,
  bm: EN_SPREADCYCLE_bm
});
export const SHAFT: Readonly<RegDef> = Object.freeze({
  bp: SHAFT_bp,
  bm: SHAFT_bm
});
export const INDEX_OTPW: Readonly<RegDef> = Object.freeze({
  bp: INDEX_OTPW_bp,
  bm: INDEX_OTPW_bm
});
export const INDEX_STEP: Readonly<RegDef> = Object.freeze({
  bp: INDEX_STEP_bp,
  bm: INDEX_STEP_bm
});
export const PDN_DISABLE: Readonly<RegDef> = Object.freeze({
  bp: PDN_DISABLE_bp,
  bm: PDN_DISABLE_bm
});
export const MSTEP_REG_SELECT: Readonly<RegDef> = Object.freeze({
  bp: MSTEP_REG_SELECT_bp,
  bm: MSTEP_REG_SELECT_bm
});
export const MULTISTEP_FILT: Readonly<RegDef> = Object.freeze({
  bp: MULTISTEP_FILT_bp,
  bm: MULTISTEP_FILT_bm
});
export const RESET: Readonly<RegDef> = Object.freeze({
  bp: RESET_bp,
  bm: RESET_bm
});
export const DRV_ERR: Readonly<RegDef> = Object.freeze({
  bp: DRV_ERR_bp,
  bm: DRV_ERR_bm
});
export const UV_CP: Readonly<RegDef> = Object.freeze({
  bp: UV_CP_bp,
  bm: UV_CP_bm
});
export const IFCNT: Readonly<RegDef> = Object.freeze({
  bp: IFCNT_bp,
  bm: IFCNT_bm
});
export const SLAVECONF: Readonly<RegDef> = Object.freeze({
  bp: SLAVECONF_bp,
  bm: SLAVECONF_bm
});
export const SENDDELAY: Readonly<RegDef> = Object.freeze({
  bp: SENDDELAY_bp,
  bm: SENDDELAY_bm
});
export const OTPBIT: Readonly<RegDef> = Object.freeze({
  bp: OTPBIT_bp,
  bm: OTPBIT_bm
});
export const OTPBYTE: Readonly<RegDef> = Object.freeze({
  bp: OTPBYTE_bp,
  bm: OTPBYTE_bm
});
export const OTPMAGIC: Readonly<RegDef> = Object.freeze({
  bp: OTPMAGIC_bp,
  bm: OTPMAGIC_bm
});
export const OTP0: Readonly<RegDef> = Object.freeze({
  bp: OTP0_bp,
  bm: OTP0_bm
});
export const OTP1: Readonly<RegDef> = Object.freeze({
  bp: OTP1_bp,
  bm: OTP1_bm
});
export const OTP2: Readonly<RegDef> = Object.freeze({
  bp: OTP2_bp,
  bm: OTP2_bm
});
export const ENN: Readonly<RegDef> = Object.freeze({
  bp: ENN_bp,
  bm: ENN_bm
});
export const MS1: Readonly<RegDef> = Object.freeze({
  bp: MS1_bp,
  bm: MS1_bm
});
export const MS2: Readonly<RegDef> = Object.freeze({
  bp: MS2_bp,
  bm: MS2_bm
});
export const DIAG: Readonly<RegDef> = Object.freeze({
  bp: DIAG_bp,
  bm: DIAG_bm
});
export const PDN_UART: Readonly<RegDef> = Object.freeze({
  bp: PDN_UART_bp,
  bm: PDN_UART_bm
});
export const STEP: Readonly<RegDef> = Object.freeze({
  bp: STEP_bp,
  bm: STEP_bm
});
export const SEL_A: Readonly<RegDef> = Object.freeze({
  bp: SEL_A_bp,
  bm: SEL_A_bm
});
export const DIR: Readonly<RegDef> = Object.freeze({
  bp: DIR_bp,
  bm: DIR_bm
});
export const VERSION: Readonly<RegDef> = Object.freeze({
  bp: VERSION_bp,
  bm: VERSION_bm
});
export const FCLKTRIM: Readonly<RegDef> = Object.freeze({
  bp: FCLKTRIM_bp,
  bm: FCLKTRIM_bm
});
export const OTTRIM: Readonly<RegDef> = Object.freeze({
  bp: OTTRIM_bp,
  bm: OTTRIM_bm
});
export const IHOLD: Readonly<RegDef> = Object.freeze({
  bp: IHOLD_bp,
  bm: IHOLD_bm
});
export const IRUN: Readonly<RegDef> = Object.freeze({
  bp: IRUN_bp,
  bm: IRUN_bm
});
export const IHOLDDELAY: Readonly<RegDef> = Object.freeze({
  bp: IHOLDDELAY_bp,
  bm: IHOLDDELAY_bm
});
export const TPOWERDOWN: Readonly<RegDef> = Object.freeze({
  bp: TPOWERDOWN_bp,
  bm: TPOWERDOWN_bm
});
export const CUR_A: Readonly<RegDef> = Object.freeze({
  bp: CUR_A_bp,
  bm: CUR_A_bm
});
export const CUR_B: Readonly<RegDef> = Object.freeze({
  bp: CUR_B_bp,
  bm: CUR_B_bm
});
export const PWM_SCALE_SUM: Readonly<RegDef> = Object.freeze({
  bp: PWM_SCALE_SUM_bp,
  bm: PWM_SCALE_SUM_bm
});
export const PWM_SCALE_AUTO: Readonly<RegDef> = Object.freeze({
  bp: PWM_SCALE_AUTO_bp,
  bm: PWM_SCALE_AUTO_bm
});
export const PWM_OFS_AUTO: Readonly<RegDef> = Object.freeze({
  bp: PWM_OFS_AUTO_bp,
  bm: PWM_OFS_AUTO_bm
});
export const PWM_GRAD_AUTO: Readonly<RegDef> = Object.freeze({
  bp: PWM_GRAD_AUTO_bp,
  bm: PWM_GRAD_AUTO_bm
});
export const TOFF: Readonly<RegDef> = Object.freeze({
  bp: TOFF_bp,
  bm: TOFF_bm
});
export const HSTRT: Readonly<RegDef> = Object.freeze({
  bp: HSTRT_bp,
  bm: HSTRT_bm
});
export const HEND: Readonly<RegDef> = Object.freeze({
  bp: HEND_bp,
  bm: HEND_bm
});
export const TBL: Readonly<RegDef> = Object.freeze({
  bp: TBL_bp,
  bm: TBL_bm
});
export const VSENSE: Readonly<RegDef> = Object.freeze({
  bp: VSENSE_bp,
  bm: VSENSE_bm
});
export const MRES: Readonly<RegDef> = Object.freeze({
  bp: MRES_bp,
  bm: MRES_bm
});
export const INTPOL: Readonly<RegDef> = Object.freeze({
  bp: INTPOL_bp,
  bm: INTPOL_bm
});
export const DEDGE: Readonly<RegDef> = Object.freeze({
  bp: DEDGE_bp,
  bm: DEDGE_bm
});
export const DISS2G: Readonly<RegDef> = Object.freeze({
  bp: DISS2G_bp,
  bm: DISS2G_bm
});
export const DISS2VS: Readonly<RegDef> = Object.freeze({
  bp: DISS2VS_bp,
  bm: DISS2VS_bm
});
export const PWM_OFS: Readonly<RegDef> = Object.freeze({
  bp: PWM_OFS_bp,
  bm: PWM_OFS_bm
});
export const PWM_GRAD: Readonly<RegDef> = Object.freeze({
  bp: PWM_GRAD_bp,
  bm: PWM_GRAD_bm
});
export const PWM_FREQ: Readonly<RegDef> = Object.freeze({
  bp: PWM_FREQ_bp,
  bm: PWM_FREQ_bm
});
export const PWM_AUTOSCALE: Readonly<RegDef> = Object.freeze({
  bp: PWM_AUTOSCALE_bp,
  bm: PWM_AUTOSCALE_bm
});
export const PWM_AUTOGRAD: Readonly<RegDef> = Object.freeze({
  bp: PWM_AUTOGRAD_bp,
  bm: PWM_AUTOGRAD_bm
});
export const FREEWHEEL: Readonly<RegDef> = Object.freeze({
  bp: FREEWHEEL_bp,
  bm: FREEWHEEL_bm
});
export const PWM_REG: Readonly<RegDef> = Object.freeze({
  bp: PWM_REG_bp,
  bm: PWM_REG_bm
});
export const PWM_LIM: Readonly<RegDef> = Object.freeze({
  bp: PWM_LIM_bp,
  bm: PWM_LIM_bm
});
export const OTPW: Readonly<RegDef> = Object.freeze({
  bp: OTPW_bp,
  bm: OTPW_bm
});
export const OT: Readonly<RegDef> = Object.freeze({
  bp: OT_bp,
  bm: OT_bm
});
export const S2GA: Readonly<RegDef> = Object.freeze({
  bp: S2GA_bp,
  bm: S2GA_bm
});
export const S2GB: Readonly<RegDef> = Object.freeze({
  bp: S2GB_bp,
  bm: S2GB_bm
});
export const S2VSA: Readonly<RegDef> = Object.freeze({
  bp: S2VSA_bp,
  bm: S2VSA_bm
});
export const S2VSB: Readonly<RegDef> = Object.freeze({
  bp: S2VSB_bp,
  bm: S2VSB_bm
});
export const OLA: Readonly<RegDef> = Object.freeze({
  bp: OLA_bp,
  bm: OLA_bm
});
export const OLB: Readonly<RegDef> = Object.freeze({
  bp: OLB_bp,
  bm: OLB_bm
});
export const T120: Readonly<RegDef> = Object.freeze({
  bp: T120_bp,
  bm: T120_bm
});
export const T143: Readonly<RegDef> = Object.freeze({
  bp: T143_bp,
  bm: T143_bm
});
export const T150: Readonly<RegDef> = Object.freeze({
  bp: T150_bp,
  bm: T150_bm
});
export const T157: Readonly<RegDef> = Object.freeze({
  bp: T157_bp,
  bm: T157_bm
});
export const CS_ACTUAL: Readonly<RegDef> = Object.freeze({
  bp: CS_ACTUAL_bp,
  bm: CS_ACTUAL_bm
});
export const STEALTH: Readonly<RegDef> = Object.freeze({
  bp: STEALTH_bp,
  bm: STEALTH_bm
});
export const STST: Readonly<RegDef> = Object.freeze({
  bp: STST_bp,
  bm: STST_bm
});
