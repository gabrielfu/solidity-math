import * as BN from "bn.js";
import * as util from "util";
import * as C from "./constants";
import { isUnchecked } from "./unchecked";


/** @description valid types to construct a new BN from */
type BNInput = number | string | number[] | Uint8Array | Buffer | BN;


/** @description checks if a & b are of the same type */
function checkSameType(a: any, b: any, opname: string) {
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
    checkSameType(a, b, opname);
    // @ts-ignore // ignores [opname]
    return a.bn[opname](b.bn); 
}


export abstract class BaseNumber {
    bn: BN;
    abstract bitlen: number;
    abstract ubound: BN;
    abstract lbound: BN;

    constructor(number: BNInput) {
        this.bn = new BN(number);
    }

    static _copy<T extends BaseNumber>(obj: T): T {
        return new (obj.constructor as new(bn: BN) => T)(obj.bn.clone());
    }

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


/** @description Unsigned integer base class */
export abstract class BaseUint extends BaseNumber {
    lbound: BN = C.BN0; // lower bound for uint is always 0

    /** 
     * @description performs unsigned integer wraparound in-place
     */
    _iwraparound(): this {
        this.bn = this.bn.mod(this.ubound.add(C.BN1));
        return this;
    }
    
}


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
}


export class Uint128 extends BaseUint {
    bitlen = 8;
    ubound = C.bit8.sub(C.BN1);
}

export class Uint256 extends BaseUint {
    bitlen = 256;
    ubound = C.bit256.sub(C.BN1);
}

export class Int256 extends BaseInt {
    bitlen = 256;
    ubound = C.bit256.div(C.BN2).sub(C.BN1);
    lbound = C.bit256.div(C.BN2).neg();
}

export function uint256(number: BNInput) { return new Uint256(number) };
uint256.max = uint256(C.bit256.sub(C.BN1));
uint256.min = uint256(C.BN0);

export function int256(number: BNInput) { return new Int256(number) };
int256.max = int256(C.bit256.div(C.BN2).sub(C.BN1));
int256.min = int256(C.bit256.div(C.BN2).neg());