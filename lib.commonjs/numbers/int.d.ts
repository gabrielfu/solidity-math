import BN from "bn.js";
import { BaseNumber, BNInput } from "./base";
/** @description Signed integer base class */
export declare abstract class BaseInt extends BaseNumber {
    static _signed: boolean;
    static get _ubound(): BN;
    static get _lbound(): BN;
    /**
     * @description performs signed integer wraparound in-place
     */
    _iwraparound(): this;
    neg(): this;
}
export declare class Int8 extends BaseInt {
    static _bitlen: number;
}
export declare class Int16 extends BaseInt {
    static _bitlen: number;
}
export declare class Int24 extends BaseInt {
    static _bitlen: number;
}
export declare class Int32 extends BaseInt {
    static _bitlen: number;
}
export declare class Int40 extends BaseInt {
    static _bitlen: number;
}
export declare class Int48 extends BaseInt {
    static _bitlen: number;
}
export declare class Int56 extends BaseInt {
    static _bitlen: number;
}
export declare class Int64 extends BaseInt {
    static _bitlen: number;
}
export declare class Int72 extends BaseInt {
    static _bitlen: number;
}
export declare class Int80 extends BaseInt {
    static _bitlen: number;
}
export declare class Int88 extends BaseInt {
    static _bitlen: number;
}
export declare class Int96 extends BaseInt {
    static _bitlen: number;
}
export declare class Int104 extends BaseInt {
    static _bitlen: number;
}
export declare class Int112 extends BaseInt {
    static _bitlen: number;
}
export declare class Int120 extends BaseInt {
    static _bitlen: number;
}
export declare class Int128 extends BaseInt {
    static _bitlen: number;
}
export declare class Int136 extends BaseInt {
    static _bitlen: number;
}
export declare class Int144 extends BaseInt {
    static _bitlen: number;
}
export declare class Int152 extends BaseInt {
    static _bitlen: number;
}
export declare class Int160 extends BaseInt {
    static _bitlen: number;
}
export declare class Int168 extends BaseInt {
    static _bitlen: number;
}
export declare class Int176 extends BaseInt {
    static _bitlen: number;
}
export declare class Int184 extends BaseInt {
    static _bitlen: number;
}
export declare class Int192 extends BaseInt {
    static _bitlen: number;
}
export declare class Int200 extends BaseInt {
    static _bitlen: number;
}
export declare class Int208 extends BaseInt {
    static _bitlen: number;
}
export declare class Int216 extends BaseInt {
    static _bitlen: number;
}
export declare class Int224 extends BaseInt {
    static _bitlen: number;
}
export declare class Int232 extends BaseInt {
    static _bitlen: number;
}
export declare class Int240 extends BaseInt {
    static _bitlen: number;
}
export declare class Int248 extends BaseInt {
    static _bitlen: number;
}
export declare class Int256 extends BaseInt {
    static _bitlen: number;
}
export declare const int8: (number: BNInput) => Int8;
export declare const int16: (number: BNInput) => Int16;
export declare const int24: (number: BNInput) => Int24;
export declare const int32: (number: BNInput) => Int32;
export declare const int40: (number: BNInput) => Int40;
export declare const int48: (number: BNInput) => Int48;
export declare const int56: (number: BNInput) => Int56;
export declare const int64: (number: BNInput) => Int64;
export declare const int72: (number: BNInput) => Int72;
export declare const int80: (number: BNInput) => Int80;
export declare const int88: (number: BNInput) => Int88;
export declare const int96: (number: BNInput) => Int96;
export declare const int104: (number: BNInput) => Int104;
export declare const int112: (number: BNInput) => Int112;
export declare const int120: (number: BNInput) => Int120;
export declare const int128: (number: BNInput) => Int128;
export declare const int136: (number: BNInput) => Int136;
export declare const int144: (number: BNInput) => Int144;
export declare const int152: (number: BNInput) => Int152;
export declare const int160: (number: BNInput) => Int160;
export declare const int168: (number: BNInput) => Int168;
export declare const int176: (number: BNInput) => Int176;
export declare const int184: (number: BNInput) => Int184;
export declare const int192: (number: BNInput) => Int192;
export declare const int200: (number: BNInput) => Int200;
export declare const int208: (number: BNInput) => Int208;
export declare const int216: (number: BNInput) => Int216;
export declare const int224: (number: BNInput) => Int224;
export declare const int232: (number: BNInput) => Int232;
export declare const int240: (number: BNInput) => Int240;
export declare const int248: (number: BNInput) => Int248;
export declare const int256: (number: BNInput) => Int256;
