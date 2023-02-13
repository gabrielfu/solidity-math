import BN from "bn.js";
import { BaseInteger, Input } from "./base";
/** @description Unsigned integer base class */
export declare class Uint extends BaseInteger {
    constructor(number: Input, bitlen: number);
    get _ubound(): BN;
    get _lbound(): BN;
    get type(): string;
    /**
     * @description performs unsigned integer wraparound in-place
     */
    _iwraparound(): this;
}
export declare const uint8: (number: Input) => Uint;
export declare const uint16: (number: Input) => Uint;
export declare const uint24: (number: Input) => Uint;
export declare const uint32: (number: Input) => Uint;
export declare const uint40: (number: Input) => Uint;
export declare const uint48: (number: Input) => Uint;
export declare const uint56: (number: Input) => Uint;
export declare const uint64: (number: Input) => Uint;
export declare const uint72: (number: Input) => Uint;
export declare const uint80: (number: Input) => Uint;
export declare const uint88: (number: Input) => Uint;
export declare const uint96: (number: Input) => Uint;
export declare const uint104: (number: Input) => Uint;
export declare const uint112: (number: Input) => Uint;
export declare const uint120: (number: Input) => Uint;
export declare const uint128: (number: Input) => Uint;
export declare const uint136: (number: Input) => Uint;
export declare const uint144: (number: Input) => Uint;
export declare const uint152: (number: Input) => Uint;
export declare const uint160: (number: Input) => Uint;
export declare const uint168: (number: Input) => Uint;
export declare const uint176: (number: Input) => Uint;
export declare const uint184: (number: Input) => Uint;
export declare const uint192: (number: Input) => Uint;
export declare const uint200: (number: Input) => Uint;
export declare const uint208: (number: Input) => Uint;
export declare const uint216: (number: Input) => Uint;
export declare const uint224: (number: Input) => Uint;
export declare const uint232: (number: Input) => Uint;
export declare const uint240: (number: Input) => Uint;
export declare const uint248: (number: Input) => Uint;
export declare const uint256: (number: Input) => Uint;
