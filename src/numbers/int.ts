import * as BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput } from "./base";

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

export class Int256 extends BaseInt {
    bitlen = 256;
    ubound = C.bit256.div(C.BN2).sub(C.BN1);
    lbound = C.bit256.div(C.BN2).neg();
}

export function int256(number: BNInput) { return new Int256(number) };
int256.max = int256(int256(0).ubound);
int256.min = int256(int256(0).lbound);
