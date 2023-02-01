import * as BN from "bn.js";
import * as C from "../constants";
import { BaseNumber, BNInput, _alias } from "./base";

/** @description Unsigned integer base class */
abstract class BaseUint extends BaseNumber {
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

export class Uint8 extends BaseUint { bitlen = 8; }
export class Uint16 extends BaseUint { bitlen = 16; }
export class Uint24 extends BaseUint { bitlen = 24; }
export class Uint32 extends BaseUint { bitlen = 32; }
export class Uint40 extends BaseUint { bitlen = 40; }
export class Uint48 extends BaseUint { bitlen = 48; }
export class Uint56 extends BaseUint { bitlen = 56; }
export class Uint64 extends BaseUint { bitlen = 64; }
export class Uint72 extends BaseUint { bitlen = 72; }
export class Uint80 extends BaseUint { bitlen = 80; }
export class Uint88 extends BaseUint { bitlen = 88; }
export class Uint96 extends BaseUint { bitlen = 96; }
export class Uint104 extends BaseUint { bitlen = 104; }
export class Uint112 extends BaseUint { bitlen = 112; }
export class Uint120 extends BaseUint { bitlen = 120; }
export class Uint128 extends BaseUint { bitlen = 128; }
export class Uint136 extends BaseUint { bitlen = 136; }
export class Uint144 extends BaseUint { bitlen = 144; }
export class Uint152 extends BaseUint { bitlen = 152; }
export class Uint160 extends BaseUint { bitlen = 160; }
export class Uint168 extends BaseUint { bitlen = 168; }
export class Uint176 extends BaseUint { bitlen = 176; }
export class Uint184 extends BaseUint { bitlen = 184; }
export class Uint192 extends BaseUint { bitlen = 192; }
export class Uint200 extends BaseUint { bitlen = 200; }
export class Uint208 extends BaseUint { bitlen = 208; }
export class Uint216 extends BaseUint { bitlen = 216; }
export class Uint224 extends BaseUint { bitlen = 224; }
export class Uint232 extends BaseUint { bitlen = 232; }
export class Uint240 extends BaseUint { bitlen = 240; }
export class Uint248 extends BaseUint { bitlen = 248; }
export class Uint256 extends BaseUint { bitlen = 256; }

const _classDispatcher: Map<number, typeof BaseUint> = new Map([
    [8, Uint8],
    [16, Uint16],
    [24, Uint24],
    [32, Uint32],
    [40, Uint40],
    [48, Uint48],
    [56, Uint56],
    [64, Uint64],
    [72, Uint72],
    [80, Uint80],
    [88, Uint88],
    [96, Uint96],
    [104, Uint104],
    [112, Uint112],
    [120, Uint120],
    [128, Uint128],
    [136, Uint136],
    [144, Uint144],
    [152, Uint152],
    [160, Uint160],
    [168, Uint168],
    [176, Uint176],
    [184, Uint184],
    [192, Uint192],
    [200, Uint200],
    [208, Uint208],
    [216, Uint216],
    [224, Uint224],
    [232, Uint232],
    [240, Uint240],
    [248, Uint248],
    [256, Uint256],
])

export const uint8: (number: BNInput) => Uint8 = _alias(_classDispatcher, 8) as (number: BNInput) => Uint8;
export const uint16: (number: BNInput) => Uint16 = _alias(_classDispatcher, 16) as (number: BNInput) => Uint16;
export const uint24: (number: BNInput) => Uint24 = _alias(_classDispatcher, 24) as (number: BNInput) => Uint24;
export const uint32: (number: BNInput) => Uint32 = _alias(_classDispatcher, 32) as (number: BNInput) => Uint32;
export const uint40: (number: BNInput) => Uint40 = _alias(_classDispatcher, 40) as (number: BNInput) => Uint40;
export const uint48: (number: BNInput) => Uint48 = _alias(_classDispatcher, 48) as (number: BNInput) => Uint48;
export const uint56: (number: BNInput) => Uint56 = _alias(_classDispatcher, 56) as (number: BNInput) => Uint56;
export const uint64: (number: BNInput) => Uint64 = _alias(_classDispatcher, 64) as (number: BNInput) => Uint64;
export const uint72: (number: BNInput) => Uint72 = _alias(_classDispatcher, 72) as (number: BNInput) => Uint72;
export const uint80: (number: BNInput) => Uint80 = _alias(_classDispatcher, 80) as (number: BNInput) => Uint80;
export const uint88: (number: BNInput) => Uint88 = _alias(_classDispatcher, 88) as (number: BNInput) => Uint88;
export const uint96: (number: BNInput) => Uint96 = _alias(_classDispatcher, 96) as (number: BNInput) => Uint96;
export const uint104: (number: BNInput) => Uint104 = _alias(_classDispatcher, 104) as (number: BNInput) => Uint104;
export const uint112: (number: BNInput) => Uint112 = _alias(_classDispatcher, 112) as (number: BNInput) => Uint112;
export const uint120: (number: BNInput) => Uint120 = _alias(_classDispatcher, 120) as (number: BNInput) => Uint120;
export const uint128: (number: BNInput) => Uint128 = _alias(_classDispatcher, 128) as (number: BNInput) => Uint128;
export const uint136: (number: BNInput) => Uint136 = _alias(_classDispatcher, 136) as (number: BNInput) => Uint136;
export const uint144: (number: BNInput) => Uint144 = _alias(_classDispatcher, 144) as (number: BNInput) => Uint144;
export const uint152: (number: BNInput) => Uint152 = _alias(_classDispatcher, 152) as (number: BNInput) => Uint152;
export const uint160: (number: BNInput) => Uint160 = _alias(_classDispatcher, 160) as (number: BNInput) => Uint160;
export const uint168: (number: BNInput) => Uint168 = _alias(_classDispatcher, 168) as (number: BNInput) => Uint168;
export const uint176: (number: BNInput) => Uint176 = _alias(_classDispatcher, 176) as (number: BNInput) => Uint176;
export const uint184: (number: BNInput) => Uint184 = _alias(_classDispatcher, 184) as (number: BNInput) => Uint184;
export const uint192: (number: BNInput) => Uint192 = _alias(_classDispatcher, 192) as (number: BNInput) => Uint192;
export const uint200: (number: BNInput) => Uint200 = _alias(_classDispatcher, 200) as (number: BNInput) => Uint200;
export const uint208: (number: BNInput) => Uint208 = _alias(_classDispatcher, 208) as (number: BNInput) => Uint208;
export const uint216: (number: BNInput) => Uint216 = _alias(_classDispatcher, 216) as (number: BNInput) => Uint216;
export const uint224: (number: BNInput) => Uint224 = _alias(_classDispatcher, 224) as (number: BNInput) => Uint224;
export const uint232: (number: BNInput) => Uint232 = _alias(_classDispatcher, 232) as (number: BNInput) => Uint232;
export const uint240: (number: BNInput) => Uint240 = _alias(_classDispatcher, 240) as (number: BNInput) => Uint240;
export const uint248: (number: BNInput) => Uint248 = _alias(_classDispatcher, 248) as (number: BNInput) => Uint248;
export const uint256: (number: BNInput) => Uint256 = _alias(_classDispatcher, 256) as (number: BNInput) => Uint256;