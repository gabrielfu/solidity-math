import BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput } from "./base";

/** @description Unsigned integer base class */
abstract class BaseUint extends BaseNumber {
    static _signed = false;

    static get _ubound(): BN {
        return C._getBitValues(this._bitlen).uintmax;
    }

    static get _lbound(): BN {
        return C.BN0; // lower bound for uint is always 0
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

export class Uint8 extends BaseUint { static _bitlen = 8; }
export class Uint16 extends BaseUint { static _bitlen = 16; }
export class Uint24 extends BaseUint { static _bitlen = 24; }
export class Uint32 extends BaseUint { static _bitlen = 32; }
export class Uint40 extends BaseUint { static _bitlen = 40; }
export class Uint48 extends BaseUint { static _bitlen = 48; }
export class Uint56 extends BaseUint { static _bitlen = 56; }
export class Uint64 extends BaseUint { static _bitlen = 64; }
export class Uint72 extends BaseUint { static _bitlen = 72; }
export class Uint80 extends BaseUint { static _bitlen = 80; }
export class Uint88 extends BaseUint { static _bitlen = 88; }
export class Uint96 extends BaseUint { static _bitlen = 96; }
export class Uint104 extends BaseUint { static _bitlen = 104; }
export class Uint112 extends BaseUint { static _bitlen = 112; }
export class Uint120 extends BaseUint { static _bitlen = 120; }
export class Uint128 extends BaseUint { static _bitlen = 128; }
export class Uint136 extends BaseUint { static _bitlen = 136; }
export class Uint144 extends BaseUint { static _bitlen = 144; }
export class Uint152 extends BaseUint { static _bitlen = 152; }
export class Uint160 extends BaseUint { static _bitlen = 160; }
export class Uint168 extends BaseUint { static _bitlen = 168; }
export class Uint176 extends BaseUint { static _bitlen = 176; }
export class Uint184 extends BaseUint { static _bitlen = 184; }
export class Uint192 extends BaseUint { static _bitlen = 192; }
export class Uint200 extends BaseUint { static _bitlen = 200; }
export class Uint208 extends BaseUint { static _bitlen = 208; }
export class Uint216 extends BaseUint { static _bitlen = 216; }
export class Uint224 extends BaseUint { static _bitlen = 224; }
export class Uint232 extends BaseUint { static _bitlen = 232; }
export class Uint240 extends BaseUint { static _bitlen = 240; }
export class Uint248 extends BaseUint { static _bitlen = 248; }
export class Uint256 extends BaseUint { static _bitlen = 256; }

// alias functions
export const uint8 = (number: BNInput): Uint8 => Uint8._new(number) as Uint8;
export const uint16 = (number: BNInput): Uint16 => Uint16._new(number) as Uint16;
export const uint24 = (number: BNInput): Uint24 => Uint24._new(number) as Uint24;
export const uint32 = (number: BNInput): Uint32 => Uint32._new(number) as Uint32;
export const uint40 = (number: BNInput): Uint40 => Uint40._new(number) as Uint40;
export const uint48 = (number: BNInput): Uint48 => Uint48._new(number) as Uint48;
export const uint56 = (number: BNInput): Uint56 => Uint56._new(number) as Uint56;
export const uint64 = (number: BNInput): Uint64 => Uint64._new(number) as Uint64;
export const uint72 = (number: BNInput): Uint72 => Uint72._new(number) as Uint72;
export const uint80 = (number: BNInput): Uint80 => Uint80._new(number) as Uint80;
export const uint88 = (number: BNInput): Uint88 => Uint88._new(number) as Uint88;
export const uint96 = (number: BNInput): Uint96 => Uint96._new(number) as Uint96;
export const uint104 = (number: BNInput): Uint104 => Uint104._new(number) as Uint104;
export const uint112 = (number: BNInput): Uint112 => Uint112._new(number) as Uint112;
export const uint120 = (number: BNInput): Uint120 => Uint120._new(number) as Uint120;
export const uint128 = (number: BNInput): Uint128 => Uint128._new(number) as Uint128;
export const uint136 = (number: BNInput): Uint136 => Uint136._new(number) as Uint136;
export const uint144 = (number: BNInput): Uint144 => Uint144._new(number) as Uint144;
export const uint152 = (number: BNInput): Uint152 => Uint152._new(number) as Uint152;
export const uint160 = (number: BNInput): Uint160 => Uint160._new(number) as Uint160;
export const uint168 = (number: BNInput): Uint168 => Uint168._new(number) as Uint168;
export const uint176 = (number: BNInput): Uint176 => Uint176._new(number) as Uint176;
export const uint184 = (number: BNInput): Uint184 => Uint184._new(number) as Uint184;
export const uint192 = (number: BNInput): Uint192 => Uint192._new(number) as Uint192;
export const uint200 = (number: BNInput): Uint200 => Uint200._new(number) as Uint200;
export const uint208 = (number: BNInput): Uint208 => Uint208._new(number) as Uint208;
export const uint216 = (number: BNInput): Uint216 => Uint216._new(number) as Uint216;
export const uint224 = (number: BNInput): Uint224 => Uint224._new(number) as Uint224;
export const uint232 = (number: BNInput): Uint232 => Uint232._new(number) as Uint232;
export const uint240 = (number: BNInput): Uint240 => Uint240._new(number) as Uint240;
export const uint248 = (number: BNInput): Uint248 => Uint248._new(number) as Uint248;
export const uint256 = (number: BNInput): Uint256 => Uint256._new(number) as Uint256;