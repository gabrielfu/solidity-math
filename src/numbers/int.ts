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

    get ubound(): BN {
        return C._getBitValues(this.bitlen).intmax;
    }

    get lbound(): BN {
        return C._getBitValues(this.bitlen).intmin;
    }
}

export class Int256 extends BaseInt { bitlen = 256; }

export function int256(number: BNInput) { return new Int256(number) };
int256.max = int256(C._getBitValues(256).intmax);
int256.min = int256(C._getBitValues(256).intmin);
