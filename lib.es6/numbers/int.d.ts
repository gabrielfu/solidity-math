import { BaseInteger, Input } from "./base";
/** @description Signed integer base class */
export declare class Int extends BaseInteger {
    constructor(number: Input, bitlen: number);
    get type(): string;
    /**
     * @description performs signed integer wraparound in-place
     */
    _iwraparound(): this;
    neg(): this;
}
export declare const int8: (number: Input) => Int;
export declare const int16: (number: Input) => Int;
export declare const int24: (number: Input) => Int;
export declare const int32: (number: Input) => Int;
export declare const int40: (number: Input) => Int;
export declare const int48: (number: Input) => Int;
export declare const int56: (number: Input) => Int;
export declare const int64: (number: Input) => Int;
export declare const int72: (number: Input) => Int;
export declare const int80: (number: Input) => Int;
export declare const int88: (number: Input) => Int;
export declare const int96: (number: Input) => Int;
export declare const int104: (number: Input) => Int;
export declare const int112: (number: Input) => Int;
export declare const int120: (number: Input) => Int;
export declare const int128: (number: Input) => Int;
export declare const int136: (number: Input) => Int;
export declare const int144: (number: Input) => Int;
export declare const int152: (number: Input) => Int;
export declare const int160: (number: Input) => Int;
export declare const int168: (number: Input) => Int;
export declare const int176: (number: Input) => Int;
export declare const int184: (number: Input) => Int;
export declare const int192: (number: Input) => Int;
export declare const int200: (number: Input) => Int;
export declare const int208: (number: Input) => Int;
export declare const int216: (number: Input) => Int;
export declare const int224: (number: Input) => Int;
export declare const int232: (number: Input) => Int;
export declare const int240: (number: Input) => Int;
export declare const int248: (number: Input) => Int;
export declare const int256: (number: Input) => Int;
