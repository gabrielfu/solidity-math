import * as BN from "bn.js";
import * as util from "util";
import { isUnchecked } from "../unchecked";

/** @description valid types to construct a new BN from */
export type BNInput = number | string | number[] | Uint8Array | Buffer | BN;

/** @description checks if a & b are of the same type */
function _checkSameType(a: any, b: any, opname: string) {
    let atype = a.constructor.name;
    let btype = b.constructor.name;
    if (atype != btype) {
        throw new TypeError(
            `Cannot perform ${opname} operation on ${atype} and ${btype}`
        );
    }
}

interface Constructor<M> {
    new (...args: any[]): M
}

/** @description performs binary operation with type safety check */
export function binaryOp<T extends BaseNumber>(
    a: T,
    b: T, 
    opname: keyof BN,
): BN {
    _checkSameType(a, b, opname);
    // @ts-ignore // ignores [opname]
    return a.bn[opname](b.bn); 
}

export abstract class BaseNumber {
    /** @description underlying BN */
    bn: BN;
    /** @description bit length (size) of this type */
    static _bitlen: number = 0;
    /** @description max representable number of this type */
    static _ubound: BN;
    /** @description min representable number of this type */
    static _lbound: BN;

    constructor(number: BNInput) {
        this.bn = new BN(number);
    }

    /** @description bit length (size) of this type */
    get _bitlen(): number {
        // @ts-ignore
        return this.constructor._bitlen;
    }
    /** @description max representable number of this type */
    get _ubound(): BN {
        // @ts-ignore
        return this.constructor._ubound;
    }
    /** @description min representable number of this type */
    get _lbound(): BN {
        // @ts-ignore
        return this.constructor._lbound;
    }

    /** @description constructor as static function supporting subclasses */
    static _new<T extends BaseNumber>(bn: BN): T {
        return new (this as unknown as new(_bn: BN) => T)(bn.clone());
    }

    /** @description max representable number of this type */
    static max<T extends BaseNumber>(): T {
        return this._new(this._ubound);
    }

    /** @description min representable number of this type */
    static min<T extends BaseNumber>(): T {
        return this._new(this._lbound);
    }

    /** @description makes a copy of this number */
    clone(): this {
        // @ts-ignore call static function
        return this.constructor._new(this.bn);
    }

    /** @description console.log string representation */
    [util.inspect.custom]() {
        return `${this.constructor.name}(bn=${this.bn.toString()})`
    }

    /** @description performs integer wrap around in-place */
    abstract _iwraparound(): this;

    /** 
     * @description Checks if `this` has under/overflowed and takes action.
     * If in unchecked mode, wraps around the lower/upper bound in-place.
     * If not, throws a RangeError.
     */
    _checkBounds(): this {
        if (this.bn.lte(this._ubound) && this.bn.gte(this._lbound)) {
            return this;
        }
        // under / overflow
        if (isUnchecked()) {
            return this._iwraparound();
        } 
        else {
            throw new RangeError(`Value under/overflow outside of unchecked mode: ${util.inspect(this)}`);
        }
    }

    iadd(b: this): this {
        binaryOp(this, b, "iadd");
        return this._checkBounds();;
    }

    add(b: this): this {
        return this.clone().iadd(b);
    }

    isub(b: this): this {
        binaryOp(this, b, "isub");
        return this._checkBounds();;
    }

    sub(b: this): this {
        return this.clone().isub(b);
    }

    imul(b: this): this {
        binaryOp(this, b, "imul");
        return this._checkBounds();;
    }

    mul(b: this): this {
        return this.clone().imul(b);
    }

    div(b: this): this {
        let r = this.clone();
        r.bn = binaryOp(r, b, "div");
        return r._checkBounds();
    }

    mod(b: this): this {
        let r = this.clone();
        r.bn = binaryOp(r, b, "mod");
        return r._checkBounds();
    }

    pow(b: this): this {
        let r = this.clone();
        r.bn = binaryOp(r, b, "pow");
        return r._checkBounds();
    }
}

/**
 * @description Create a BaseNamber subclass instance.
 * @param cls BaseNumber subclass type
 * @param number input argument for the constructor
 * @param bitlen 
 */
function _createInstance(
    cls: typeof BaseNumber, 
    number: BNInput, 
    bitlen: number
): BaseNumber {
    return new (cls as unknown as new(number: BNInput) => BaseNumber)(number);
}

/**
 * @description helper function to create an alias for a BaseNumber subclass
 * @param classDispatcher a mapping of `bitlen` to corresponding BaseNumber subclass constructor
 * @param bitlen 
 */
export function _alias(
    classDispatcher: Map<number, typeof BaseNumber>,
    bitlen: number
): (number: BNInput) => BaseNumber {
    let cls = (classDispatcher.get(bitlen) as typeof BaseNumber)
    const f = function(number: BNInput) { 
        return _createInstance(cls, number, bitlen) 
    };
    f.max = f(cls._ubound);
    f.min = f(cls._lbound);
    return f;
}