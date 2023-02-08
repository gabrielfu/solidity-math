import BN from "bn.js";
import { BaseNumber, BNInput } from "./base";
/** @description Unsigned integer base class */
export declare abstract class BaseUint extends BaseNumber {
    static _signed: boolean;
    static get _ubound(): BN;
    static get _lbound(): BN;
    /**
     * @description performs unsigned integer wraparound in-place
     */
    _iwraparound(): this;
}
export declare class Uint8 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint16 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint24 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint32 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint40 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint48 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint56 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint64 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint72 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint80 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint88 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint96 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint104 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint112 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint120 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint128 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint136 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint144 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint152 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint160 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint168 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint176 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint184 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint192 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint200 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint208 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint216 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint224 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint232 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint240 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint248 extends BaseUint {
    static _bitlen: number;
}
export declare class Uint256 extends BaseUint {
    static _bitlen: number;
}
export declare const uint8: (number: BNInput) => Uint8;
export declare const uint16: (number: BNInput) => Uint16;
export declare const uint24: (number: BNInput) => Uint24;
export declare const uint32: (number: BNInput) => Uint32;
export declare const uint40: (number: BNInput) => Uint40;
export declare const uint48: (number: BNInput) => Uint48;
export declare const uint56: (number: BNInput) => Uint56;
export declare const uint64: (number: BNInput) => Uint64;
export declare const uint72: (number: BNInput) => Uint72;
export declare const uint80: (number: BNInput) => Uint80;
export declare const uint88: (number: BNInput) => Uint88;
export declare const uint96: (number: BNInput) => Uint96;
export declare const uint104: (number: BNInput) => Uint104;
export declare const uint112: (number: BNInput) => Uint112;
export declare const uint120: (number: BNInput) => Uint120;
export declare const uint128: (number: BNInput) => Uint128;
export declare const uint136: (number: BNInput) => Uint136;
export declare const uint144: (number: BNInput) => Uint144;
export declare const uint152: (number: BNInput) => Uint152;
export declare const uint160: (number: BNInput) => Uint160;
export declare const uint168: (number: BNInput) => Uint168;
export declare const uint176: (number: BNInput) => Uint176;
export declare const uint184: (number: BNInput) => Uint184;
export declare const uint192: (number: BNInput) => Uint192;
export declare const uint200: (number: BNInput) => Uint200;
export declare const uint208: (number: BNInput) => Uint208;
export declare const uint216: (number: BNInput) => Uint216;
export declare const uint224: (number: BNInput) => Uint224;
export declare const uint232: (number: BNInput) => Uint232;
export declare const uint240: (number: BNInput) => Uint240;
export declare const uint248: (number: BNInput) => Uint248;
export declare const uint256: (number: BNInput) => Uint256;
