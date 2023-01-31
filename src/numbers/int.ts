import * as BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput, _alias } from "./base";

/** @description Signed integer base class */
export abstract class BaseInt extends BaseNumber {
    /** 
     * @description performs signed integer wraparound in-place
     * copied from https://stackoverflow.com/a/707426
     */
    _iwraparound(): this {
        let range = this.ubound.sub(this.lbound).add(C.BN1);
        if (this.bn.lt(this.lbound)) {
            let a = this.lbound.sub(this.bn).div(range).add(C.BN1).mul(range);
            this.bn.iadd(a);
        }
        this.bn = this.bn.sub(this.lbound).mod(range).add(this.lbound);
        return this;
    }

    get ubound(): BN {
        return C._getBitValues(this.bitlen).intmax;
    }

    get lbound(): BN {
        return C._getBitValues(this.bitlen).intmin;
    }

    neg() {
        let r = this.clone();
        r.bn = r.bn.neg();
        return r._checkBounds();
    }
}

export class Int8 extends BaseInt { bitlen = 8; }
export class Int16 extends BaseInt { bitlen = 16; }
export class Int24 extends BaseInt { bitlen = 24; }
export class Int32 extends BaseInt { bitlen = 32; }
export class Int40 extends BaseInt { bitlen = 40; }
export class Int48 extends BaseInt { bitlen = 48; }
export class Int56 extends BaseInt { bitlen = 56; }
export class Int64 extends BaseInt { bitlen = 64; }
export class Int72 extends BaseInt { bitlen = 72; }
export class Int80 extends BaseInt { bitlen = 80; }
export class Int88 extends BaseInt { bitlen = 88; }
export class Int96 extends BaseInt { bitlen = 96; }
export class Int104 extends BaseInt { bitlen = 104; }
export class Int112 extends BaseInt { bitlen = 112; }
export class Int120 extends BaseInt { bitlen = 120; }
export class Int128 extends BaseInt { bitlen = 128; }
export class Int136 extends BaseInt { bitlen = 136; }
export class Int144 extends BaseInt { bitlen = 144; }
export class Int152 extends BaseInt { bitlen = 152; }
export class Int160 extends BaseInt { bitlen = 160; }
export class Int168 extends BaseInt { bitlen = 168; }
export class Int176 extends BaseInt { bitlen = 176; }
export class Int184 extends BaseInt { bitlen = 184; }
export class Int192 extends BaseInt { bitlen = 192; }
export class Int200 extends BaseInt { bitlen = 200; }
export class Int208 extends BaseInt { bitlen = 208; }
export class Int216 extends BaseInt { bitlen = 216; }
export class Int224 extends BaseInt { bitlen = 224; }
export class Int232 extends BaseInt { bitlen = 232; }
export class Int240 extends BaseInt { bitlen = 240; }
export class Int248 extends BaseInt { bitlen = 248; }
export class Int256 extends BaseInt { bitlen = 256; }

const _classDispatcher: Map<number, typeof BaseInt> = new Map([
    [8, Int8],
    [16, Int16],
    [24, Int24],
    [32, Int32],
    [40, Int40],
    [48, Int48],
    [56, Int56],
    [64, Int64],
    [72, Int72],
    [80, Int80],
    [88, Int88],
    [96, Int96],
    [104, Int104],
    [112, Int112],
    [120, Int120],
    [128, Int128],
    [136, Int136],
    [144, Int144],
    [152, Int152],
    [160, Int160],
    [168, Int168],
    [176, Int176],
    [184, Int184],
    [192, Int192],
    [200, Int200],
    [208, Int208],
    [216, Int216],
    [224, Int224],
    [232, Int232],
    [240, Int240],
    [248, Int248],
    [256, Int256],
])

export const int8: (number: BNInput) => Int8 = _alias(_classDispatcher, 8);
export const int16: (number: BNInput) => Int16 = _alias(_classDispatcher, 16);
export const int24: (number: BNInput) => Int24 = _alias(_classDispatcher, 24);
export const int32: (number: BNInput) => Int32 = _alias(_classDispatcher, 32);
export const int40: (number: BNInput) => Int40 = _alias(_classDispatcher, 40);
export const int48: (number: BNInput) => Int48 = _alias(_classDispatcher, 48);
export const int56: (number: BNInput) => Int56 = _alias(_classDispatcher, 56);
export const int64: (number: BNInput) => Int64 = _alias(_classDispatcher, 64);
export const int72: (number: BNInput) => Int72 = _alias(_classDispatcher, 72);
export const int80: (number: BNInput) => Int80 = _alias(_classDispatcher, 80);
export const int88: (number: BNInput) => Int88 = _alias(_classDispatcher, 88);
export const int96: (number: BNInput) => Int96 = _alias(_classDispatcher, 96);
export const int104: (number: BNInput) => Int104 = _alias(_classDispatcher, 104);
export const int112: (number: BNInput) => Int112 = _alias(_classDispatcher, 112);
export const int120: (number: BNInput) => Int120 = _alias(_classDispatcher, 120);
export const int128: (number: BNInput) => Int128 = _alias(_classDispatcher, 128);
export const int136: (number: BNInput) => Int136 = _alias(_classDispatcher, 136);
export const int144: (number: BNInput) => Int144 = _alias(_classDispatcher, 144);
export const int152: (number: BNInput) => Int152 = _alias(_classDispatcher, 152);
export const int160: (number: BNInput) => Int160 = _alias(_classDispatcher, 160);
export const int168: (number: BNInput) => Int168 = _alias(_classDispatcher, 168);
export const int176: (number: BNInput) => Int176 = _alias(_classDispatcher, 176);
export const int184: (number: BNInput) => Int184 = _alias(_classDispatcher, 184);
export const int192: (number: BNInput) => Int192 = _alias(_classDispatcher, 192);
export const int200: (number: BNInput) => Int200 = _alias(_classDispatcher, 200);
export const int208: (number: BNInput) => Int208 = _alias(_classDispatcher, 208);
export const int216: (number: BNInput) => Int216 = _alias(_classDispatcher, 216);
export const int224: (number: BNInput) => Int224 = _alias(_classDispatcher, 224);
export const int232: (number: BNInput) => Int232 = _alias(_classDispatcher, 232);
export const int240: (number: BNInput) => Int240 = _alias(_classDispatcher, 240);
export const int248: (number: BNInput) => Int248 = _alias(_classDispatcher, 248);
export const int256: (number: BNInput) => Int256 = _alias(_classDispatcher, 256);
