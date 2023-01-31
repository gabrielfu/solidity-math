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
    abstract bitlen: number;
    /** @description max representable number of this type */
    abstract ubound: BN;
    /** @description min representable number of this type */
    abstract lbound: BN;

    constructor(number: BNInput) {
        this.bn = new BN(number);
    }

    static _copy<T extends BaseNumber>(obj: T): T {
        return new (obj.constructor as new(bn: BN) => T)(obj.bn.clone());
    }

    /** @description makes a copy of this number */
    clone(): this {
        return BaseNumber._copy(this);
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
        if (this.bn.lte(this.ubound) && this.bn.gte(this.lbound)) {
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
}

/**
 * @description Create a BaseNamber subclass instance.
 * @param classDispatcher a mapping of `bitlen` to corresponding BaseNumber subclass constructor
 * @param number input argument for the constructor
 * @param bitlen 
 */
function _createInstance(
    classDispatcher: Map<number, typeof BaseNumber>, 
    number: BNInput, 
    bitlen: number
): BaseNumber {
    return new ((classDispatcher.get(bitlen) as unknown) as new(number: BNInput) => BaseNumber)(number);
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
    const f = function(number: BNInput) { 
        return _createInstance(classDispatcher, number, bitlen) 
    };
    f.max = f(f(0).ubound);
    f.min = f(f(0).lbound);
    return f;
}