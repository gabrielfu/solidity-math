import BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput } from "./base";

/** @description Signed integer base class */
export abstract class BaseInt extends BaseNumber {
    static _signed = true;

    static get _ubound() {
        return C._getBitValues(this._bitlen).intmax;
    }

    static get _lbound() {
        return C._getBitValues(this._bitlen).intmin;
    }

    /** 
     * @description performs signed integer wraparound in-place
     */
    _iwraparound(): this {
        const range = this._ubound.sub(this._lbound).add(C.BN1);
        this.bn = this.bn.sub(this._lbound).mod(range);
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(C.BN1);
        }
        else {
            this.bn = this.bn.add(this._lbound);
        }
        return this;
    }

    neg() {
        const r = this.clone();
        r.bn = r.bn.neg();
        return r._checkBounds();
    }
}

export class Int8 extends BaseInt { static _bitlen = 8; }
export class Int16 extends BaseInt { static _bitlen = 16; }
export class Int24 extends BaseInt { static _bitlen = 24; }
export class Int32 extends BaseInt { static _bitlen = 32; }
export class Int40 extends BaseInt { static _bitlen = 40; }
export class Int48 extends BaseInt { static _bitlen = 48; }
export class Int56 extends BaseInt { static _bitlen = 56; }
export class Int64 extends BaseInt { static _bitlen = 64; }
export class Int72 extends BaseInt { static _bitlen = 72; }
export class Int80 extends BaseInt { static _bitlen = 80; }
export class Int88 extends BaseInt { static _bitlen = 88; }
export class Int96 extends BaseInt { static _bitlen = 96; }
export class Int104 extends BaseInt { static _bitlen = 104; }
export class Int112 extends BaseInt { static _bitlen = 112; }
export class Int120 extends BaseInt { static _bitlen = 120; }
export class Int128 extends BaseInt { static _bitlen = 128; }
export class Int136 extends BaseInt { static _bitlen = 136; }
export class Int144 extends BaseInt { static _bitlen = 144; }
export class Int152 extends BaseInt { static _bitlen = 152; }
export class Int160 extends BaseInt { static _bitlen = 160; }
export class Int168 extends BaseInt { static _bitlen = 168; }
export class Int176 extends BaseInt { static _bitlen = 176; }
export class Int184 extends BaseInt { static _bitlen = 184; }
export class Int192 extends BaseInt { static _bitlen = 192; }
export class Int200 extends BaseInt { static _bitlen = 200; }
export class Int208 extends BaseInt { static _bitlen = 208; }
export class Int216 extends BaseInt { static _bitlen = 216; }
export class Int224 extends BaseInt { static _bitlen = 224; }
export class Int232 extends BaseInt { static _bitlen = 232; }
export class Int240 extends BaseInt { static _bitlen = 240; }
export class Int248 extends BaseInt { static _bitlen = 248; }
export class Int256 extends BaseInt { static _bitlen = 256; }

// alias functions
export const int8 = (number: BNInput) => Int8._new(number) as Int8;
export const int16 = (number: BNInput) => Int16._new(number) as Int16;
export const int24 = (number: BNInput) => Int24._new(number) as Int24;
export const int32 = (number: BNInput) => Int32._new(number) as Int32;
export const int40 = (number: BNInput) => Int40._new(number) as Int40;
export const int48 = (number: BNInput) => Int48._new(number) as Int48;
export const int56 = (number: BNInput) => Int56._new(number) as Int56;
export const int64 = (number: BNInput) => Int64._new(number) as Int64;
export const int72 = (number: BNInput) => Int72._new(number) as Int72;
export const int80 = (number: BNInput) => Int80._new(number) as Int80;
export const int88 = (number: BNInput) => Int88._new(number) as Int88;
export const int96 = (number: BNInput) => Int96._new(number) as Int96;
export const int104 = (number: BNInput) => Int104._new(number) as Int104;
export const int112 = (number: BNInput) => Int112._new(number) as Int112;
export const int120 = (number: BNInput) => Int120._new(number) as Int120;
export const int128 = (number: BNInput) => Int128._new(number) as Int128;
export const int136 = (number: BNInput) => Int136._new(number) as Int136;
export const int144 = (number: BNInput) => Int144._new(number) as Int144;
export const int152 = (number: BNInput) => Int152._new(number) as Int152;
export const int160 = (number: BNInput) => Int160._new(number) as Int160;
export const int168 = (number: BNInput) => Int168._new(number) as Int168;
export const int176 = (number: BNInput) => Int176._new(number) as Int176;
export const int184 = (number: BNInput) => Int184._new(number) as Int184;
export const int192 = (number: BNInput) => Int192._new(number) as Int192;
export const int200 = (number: BNInput) => Int200._new(number) as Int200;
export const int208 = (number: BNInput) => Int208._new(number) as Int208;
export const int216 = (number: BNInput) => Int216._new(number) as Int216;
export const int224 = (number: BNInput) => Int224._new(number) as Int224;
export const int232 = (number: BNInput) => Int232._new(number) as Int232;
export const int240 = (number: BNInput) => Int240._new(number) as Int240;
export const int248 = (number: BNInput) => Int248._new(number) as Int248;
export const int256 = (number: BNInput) => Int256._new(number) as Int256;