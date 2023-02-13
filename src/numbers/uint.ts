import * as C from "../constants";
import { BaseInteger, BNInput } from "./base";

/** @description Unsigned integer base class */
export class BaseUint extends BaseInteger {
    get type(): string {
        return `Uint${this._bitlen}`
    }

    /** 
     * @description performs unsigned integer wraparound in-place
     */
    _iwraparound(): this {
        this.bn = this.bn.mod(this._ubound.add(C.BN1));
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(C.BN1);
        }
        return this;
    }
}

export const uint8 = (number: BNInput): BaseUint => new BaseUint(number, 8, false);
export const uint16 = (number: BNInput): BaseUint => new BaseUint(number, 16, false);
export const uint24 = (number: BNInput): BaseUint => new BaseUint(number, 24, false);
export const uint32 = (number: BNInput): BaseUint => new BaseUint(number, 32, false);
export const uint40 = (number: BNInput): BaseUint => new BaseUint(number, 40, false);
export const uint48 = (number: BNInput): BaseUint => new BaseUint(number, 48, false);
export const uint56 = (number: BNInput): BaseUint => new BaseUint(number, 56, false);
export const uint64 = (number: BNInput): BaseUint => new BaseUint(number, 64, false);
export const uint72 = (number: BNInput): BaseUint => new BaseUint(number, 72, false);
export const uint80 = (number: BNInput): BaseUint => new BaseUint(number, 80, false);
export const uint88 = (number: BNInput): BaseUint => new BaseUint(number, 88, false);
export const uint96 = (number: BNInput): BaseUint => new BaseUint(number, 96, false);
export const uint104 = (number: BNInput): BaseUint => new BaseUint(number, 104, false);
export const uint112 = (number: BNInput): BaseUint => new BaseUint(number, 112, false);
export const uint120 = (number: BNInput): BaseUint => new BaseUint(number, 120, false);
export const uint128 = (number: BNInput): BaseUint => new BaseUint(number, 128, false);
export const uint136 = (number: BNInput): BaseUint => new BaseUint(number, 136, false);
export const uint144 = (number: BNInput): BaseUint => new BaseUint(number, 144, false);
export const uint152 = (number: BNInput): BaseUint => new BaseUint(number, 152, false);
export const uint160 = (number: BNInput): BaseUint => new BaseUint(number, 160, false);
export const uint168 = (number: BNInput): BaseUint => new BaseUint(number, 168, false);
export const uint176 = (number: BNInput): BaseUint => new BaseUint(number, 176, false);
export const uint184 = (number: BNInput): BaseUint => new BaseUint(number, 184, false);
export const uint192 = (number: BNInput): BaseUint => new BaseUint(number, 192, false);
export const uint200 = (number: BNInput): BaseUint => new BaseUint(number, 200, false);
export const uint208 = (number: BNInput): BaseUint => new BaseUint(number, 208, false);
export const uint216 = (number: BNInput): BaseUint => new BaseUint(number, 216, false);
export const uint224 = (number: BNInput): BaseUint => new BaseUint(number, 224, false);
export const uint232 = (number: BNInput): BaseUint => new BaseUint(number, 232, false);
export const uint240 = (number: BNInput): BaseUint => new BaseUint(number, 240, false);
export const uint248 = (number: BNInput): BaseUint => new BaseUint(number, 248, false);
export const uint256 = (number: BNInput): BaseUint => new BaseUint(number, 256, false);