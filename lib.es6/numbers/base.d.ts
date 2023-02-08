/// <reference types="node" />
/// <reference types="node" />
import BN from "bn.js";
import util from "util";
/** @description valid types to construct a new BN from */
export declare type BNInput = number | string | number[] | Uint8Array | Buffer | BN;
export declare type Input = BNInput | BaseNumber;
export declare type ConcreteNumberClass = {
    new (_: any): BaseNumber;
};
export declare abstract class BaseNumber {
    /** @description underlying BN */
    bn: BN;
    /** @description bit length (size) of this type */
    static _bitlen: number;
    /** @description max representable number of this type */
    static _ubound: BN;
    /** @description min representable number of this type */
    static _lbound: BN;
    /** @description whether this type is signed or unsigned */
    static _signed: boolean;
    constructor(number: Input);
    /** @description bit length (size) of this type */
    get _bitlen(): number;
    /** @description max representable number of this type */
    get _ubound(): BN;
    /** @description min representable number of this type */
    get _lbound(): BN;
    /** @description bit length (size) of this type */
    get _signed(): boolean;
    /** @description constructor as static function supporting subclasses */
    static _new<T extends BaseNumber>(number: Input): T;
    /** @description max representable number of this type */
    static max<T extends BaseNumber>(): T;
    /** @description min representable number of this type */
    static min<T extends BaseNumber>(): T;
    /** @description makes a copy of this number */
    clone(): this;
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
    /** @description cast to another BaseNumber subclass type */
    as<T extends BaseNumber>(btype: typeof BaseNumber): T;
    /** @description cast to another BaseNumber subclass type */
    like<T extends BaseNumber>(b: T): T;
    iadd(b: Input): this;
    add(b: Input): BaseNumber;
    isub(b: Input): this;
    sub(b: Input): BaseNumber;
    imul(b: Input): this;
    mul(b: Input): BaseNumber;
    idiv(b: Input): this;
    div(b: Input): BaseNumber;
    imod(b: Input): this;
    mod(b: Input): BaseNumber;
    pow(b: Input): BaseNumber;
    addmod(b: Input, m: Input): this;
    mulmod(b: Input, m: Input): this;
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
