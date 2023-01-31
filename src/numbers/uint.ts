import * as BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput } from "./base";

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

export class Uint128 extends BaseUint {
    bitlen = 8;
    ubound = C.bit8.sub(C.BN1);
}

export class Uint256 extends BaseUint {
    bitlen = 256;
    ubound = C.bit256.sub(C.BN1);
}

export function uint256(number: BNInput) { return new Uint256(number) };
uint256.max = uint256(uint256(0).ubound);
uint256.min = uint256(uint256(0).lbound);