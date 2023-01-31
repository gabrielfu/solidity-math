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
    bitlen: number;
    abstract rmax: BN;

    constructor(
        number: BNInput,
        bitlen: number,
    ) {
        this.bn = new BN(number);
        this.bitlen = bitlen;
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

    iadd(b: this): this {
        binaryOp(this, b, "iadd");
        return this;
    }

    add(b: this): this {
        return this.clone().iadd(b);
    }
}


/** @description Unsigned integer base class */
export class BaseUint extends BaseNumber {
    rmax: BN;

    constructor(
        number: BNInput,
        bitlen: number,
    ) {
        super(number, bitlen);
        this.rmax = C.ranges.get(bitlen) as BN;
    }

    iadd(b: this): this {
        super.iadd(b);
        this.bn = this.bn.mod(this.rmax);
        return this;
    }
}


/** @description Signed integer base class */
export class BaseInt extends BaseNumber {
    rmax: BN;

    constructor(
        number: BNInput,
        bitlen: number,
    ) {
        super(number, bitlen);
        this.rmax = C.ranges.get(bitlen) as BN;
    }

    iadd(b: this): this {
        super.iadd(b);
        this.bn = this.bn.mod(this.rmax);
        return this;
    }
}


export class Uint8 extends BaseUint {
    constructor(number: BNInput) { super(number, 8); }
}

export class Uint256 extends BaseUint {
    constructor(number: BNInput) { super(number, 256); }
}

export class Int256 extends BaseInt {
    constructor(number: BNInput) { super(number, 256); }
}

export function uint256(number: BNInput) { return new Uint256(number) };
uint256.max = uint256(C.bit256.sub(C.BN1));
uint256.min = uint256(C.BN0);

export function int256(number: BNInput) { return new Int256(number) };
int256.max = int256(C.bit256.div(C.BN2).sub(C.BN1));
int256.min = int256(C.bit256.div(C.BN2).neg());