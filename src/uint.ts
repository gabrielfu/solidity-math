import * as BN from "bn.js";
import * as util from "util";
import { checkSameType, createNewInstance } from "./utils";

const BN0 = new BN(0);
const BN1 = new BN(1);
const BN2 = new BN(2);
const BN256 = new BN(256);
const bit256 = BN2.pow(BN256);

const ranges: Map<number, BN> = new Map([
    [2, BN2.pow(BN2)],
    [256, BN2.pow(BN256)],
]);


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


export class BaseUint extends BaseNumber {
    rmax: BN;

    constructor(
        number: BNInput,
        bitlen: number,
    ) {
        super(number, bitlen);
        this.rmax = ranges.get(bitlen) as BN;
    }

    iadd(b: this): this {
        super.iadd(b);
        this.bn = this.bn.mod(this.rmax);
        return this;
    }
}


export class Uint256 extends BaseUint {
    constructor(
        number: BNInput,
    ) {
        super(number, 256);
    }
}

export function uint256(number: BNInput) { return new Uint256(number) };
uint256.max = uint256(bit256.sub(BN1));