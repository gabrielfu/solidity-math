import * as BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput } from "./base";

/** @description Unsigned integer base class */
export abstract class BaseUint extends BaseNumber {
    /** 
     * @description performs unsigned integer wraparound in-place
     */
    _iwraparound(): this {
        this.bn = this.bn.mod(this.ubound.add(C.BN1));
        return this;
    }

    get ubound(): BN {
        return C._getBitValues(this.bitlen).uintmax;
    }

    get lbound(): BN {
        return C.BN0; // lower bound for uint is always 0
    }
}

export class Uint8 extends BaseUint { bitlen = 8;}
export class Uint256 extends BaseUint { bitlen = 256; }

export function uint256(number: BNInput) { return new Uint256(number) };
uint256.max = uint256(C._getBitValues(256).uintmax);
uint256.min = uint256(C.BN0);