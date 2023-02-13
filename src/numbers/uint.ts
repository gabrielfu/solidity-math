import { BN1 } from "../constants";
import { BaseInteger, Input } from "./base";

/** @description Unsigned integer base class */
export class Uint extends BaseInteger {
    constructor(number: Input, bitlen: number) {
        super(number, bitlen, false);
    }

    get type(): string {
        return `uint${this._bitlen}`;
    }

    /** 
     * @description performs unsigned integer wraparound in-place
     */
    _iwraparound(): this {
        this.bn = this.bn.mod(this._ubound.add(BN1));
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(BN1);
        }
        return this;
    }
}

export const uint8 = (number: Input): Uint => new Uint(number, 8);
export const uint16 = (number: Input): Uint => new Uint(number, 16);
export const uint24 = (number: Input): Uint => new Uint(number, 24);
export const uint32 = (number: Input): Uint => new Uint(number, 32);
export const uint40 = (number: Input): Uint => new Uint(number, 40);
export const uint48 = (number: Input): Uint => new Uint(number, 48);
export const uint56 = (number: Input): Uint => new Uint(number, 56);
export const uint64 = (number: Input): Uint => new Uint(number, 64);
export const uint72 = (number: Input): Uint => new Uint(number, 72);
export const uint80 = (number: Input): Uint => new Uint(number, 80);
export const uint88 = (number: Input): Uint => new Uint(number, 88);
export const uint96 = (number: Input): Uint => new Uint(number, 96);
export const uint104 = (number: Input): Uint => new Uint(number, 104);
export const uint112 = (number: Input): Uint => new Uint(number, 112);
export const uint120 = (number: Input): Uint => new Uint(number, 120);
export const uint128 = (number: Input): Uint => new Uint(number, 128);
export const uint136 = (number: Input): Uint => new Uint(number, 136);
export const uint144 = (number: Input): Uint => new Uint(number, 144);
export const uint152 = (number: Input): Uint => new Uint(number, 152);
export const uint160 = (number: Input): Uint => new Uint(number, 160);
export const uint168 = (number: Input): Uint => new Uint(number, 168);
export const uint176 = (number: Input): Uint => new Uint(number, 176);
export const uint184 = (number: Input): Uint => new Uint(number, 184);
export const uint192 = (number: Input): Uint => new Uint(number, 192);
export const uint200 = (number: Input): Uint => new Uint(number, 200);
export const uint208 = (number: Input): Uint => new Uint(number, 208);
export const uint216 = (number: Input): Uint => new Uint(number, 216);
export const uint224 = (number: Input): Uint => new Uint(number, 224);
export const uint232 = (number: Input): Uint => new Uint(number, 232);
export const uint240 = (number: Input): Uint => new Uint(number, 240);
export const uint248 = (number: Input): Uint => new Uint(number, 248);
export const uint256 = (number: Input): Uint => new Uint(number, 256);