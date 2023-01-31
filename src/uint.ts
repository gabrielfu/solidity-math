import * as BN from "bn.js";
import * as util from "util";
import { checkSameType, createNewInstance } from "./utils";
import * as C from "./constants";



/** @description valid types to construct a new BN from */
type BNInput = number | string | number[] | Uint8Array | Buffer | BN;


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

    get uboundp1() {
        return this.ubound.add(C.BN1);
    }

    get lbounds1() {
        return this.lbound.sub(C.BN1);
    }

    clone(): this {
        let obj = createNewInstance(this);
        obj.bn = this.bn.clone();
        obj.bitlen = this.bitlen;
        return obj;
    }

    /** @description console.log string representation */
    [util.inspect.custom]() {
        return `${this.constructor.name}(bn=${this.bn.toString()})`
    }

    /** 
     * @description performs integer wraparound in-place
     * copied from https://stackoverflow.com/a/707426
     */
    iwraparound(): this {
        let range = this.ubound.sub(this.lbound).add(C.BN1);
        if (this.bn.lt(this.lbound)) {
            let a = this.lbound.sub(this.bn).div(range).add(C.BN1).mul(range);
            this.bn.iadd(a);
        }
        this.bn = this.bn.sub(this.lbound).mod(range).add(this.lbound);
        return this;
    }

    iadd(b: this): this {
        binaryOp(this, b, "iadd");
        return this.iwraparound();;
    }

    add(b: this): this {
        return this.clone().iadd(b);
    }
}

// TODO: necessary base classes?
/** @description Unsigned integer base class */
export abstract class BaseUint extends BaseNumber {
    lbound: BN = C.BN0; // lower bound for uint is always 0
}


/** @description Signed integer base class */
export abstract class BaseInt extends BaseNumber {}


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