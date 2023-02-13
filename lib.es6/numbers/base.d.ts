/// <reference types="node" />
/// <reference types="node" />
import BN from "bn.js";
import util from "util";
/** @description valid types to construct a new BN from */
export declare type BNInput = number | string | number[] | Uint8Array | Buffer | BN;
export declare type Input = BNInput | BaseInteger;
export declare abstract class BaseInteger {
    /** @description underlying BN */
    bn: BN;
    /** @description bit length (size) of this number */
    readonly _bitlen: number;
    /** @description whether this number is signed or unsigned */
    readonly _signed: boolean;
    constructor(number: Input, bitlen: number, signed: boolean);
    /** @description max representable number of this type */
    get _ubound(): BN;
    /** @description min representable number of this type */
    get _lbound(): BN;
    /** @description create new instance with same bitlen & signedness as `this` */
    _new(number: Input): this;
    /** @description makes a copy of this number */
    clone(): this;
    /** @description returns type of this instance */
    abstract get type(): string;
    /** @description string representation of underlying value */
    toString(base?: number): string;
    /** @description string representation of instance */
    [util.inspect.custom](): string;
    /** @description performs integer wrap around in-place */
    abstract _iwraparound(): this;
    /**
     * @description Checks if `this` has under/overflowed and takes action.
     * If in unchecked mode, wraps around the lower/upper bound in-place.
     * If not, throws a RangeError.
     */
    _checkBounds(): this;
    /** @description cast this to the type `_type` */
    cast<T extends BaseInteger>(_type: (number: Input) => T): T;
    /** @description cast this to the type of `b` */
    like<T extends BaseInteger>(b: T): T;
    iadd(b: Input): this;
    add(b: Input): BaseInteger;
    isub(b: Input): this;
    sub(b: Input): BaseInteger;
    imul(b: Input): this;
    mul(b: Input): BaseInteger;
    idiv(b: Input): this;
    div(b: Input): BaseInteger;
    imod(b: Input): this;
    mod(b: Input): BaseInteger;
    pow(b: Input): BaseInteger;
    addmod(b: Input, m: Input): this;
    mulmod(b: Input, m: Input): this;
    /**
     * For positive and negative x values, x << y is equivalent to x * 2**y.
     * For positive x values, x >> y is equivalent to x / 2**y.
     * For negative x values, x >> y is equivalent to (x + 1) / 2**y - 1
     *  (which is the same as dividing x by 2**y while rounding down towards negative infinity).
     */
    ishln(b: Input): this;
    shln(b: Input): this;
    ishrn(b: Input): this;
    shrn(b: Input): this;
    iand(b: Input): this;
    and(b: Input): this;
    ior(b: Input): this;
    or(b: Input): this;
    ixor(b: Input): this;
    xor(b: Input): this;
    inot(): this;
    not(): this;
    gt(b: Input): boolean;
    lt(b: Input): boolean;
    gte(b: Input): boolean;
    lte(b: Input): boolean;
    eq(b: Input): boolean;
    neq(b: Input): boolean;
    gt_(b: Input): this;
    lt_(b: Input): this;
    gte_(b: Input): this;
    lte_(b: Input): this;
    eq_(b: Input): this;
    neq_(b: Input): this;
}
