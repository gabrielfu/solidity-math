import { BN1 } from "../constants";
import { BaseInteger, Input } from "./base";

/** @description Signed integer base class */
export class Int extends BaseInteger {
    constructor(number: Input, bitlen: number) {
        super(number, bitlen, true);
    }

    get type(): string {
        return `int${this._bitlen}`;
    }

    /** 
     * @description performs signed integer wraparound in-place
     */
    _iwraparound(): this {
        const range = this._ubound.sub(this._lbound).add(BN1);
        this.bn = this.bn.sub(this._lbound).mod(range);
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(BN1);
        }
        else {
            this.bn = this.bn.add(this._lbound);
        }
        return this;
    }

    neg(): this {
        const r = this.clone();
        r.bn = r.bn.neg();
        return r._checkBounds();
    }
}

export const int8 = (number: Input): Int => new Int(number, 8);
export const int16 = (number: Input): Int => new Int(number, 16);
export const int24 = (number: Input): Int => new Int(number, 24);
export const int32 = (number: Input): Int => new Int(number, 32);
export const int40 = (number: Input): Int => new Int(number, 40);
export const int48 = (number: Input): Int => new Int(number, 48);
export const int56 = (number: Input): Int => new Int(number, 56);
export const int64 = (number: Input): Int => new Int(number, 64);
export const int72 = (number: Input): Int => new Int(number, 72);
export const int80 = (number: Input): Int => new Int(number, 80);
export const int88 = (number: Input): Int => new Int(number, 88);
export const int96 = (number: Input): Int => new Int(number, 96);
export const int104 = (number: Input): Int => new Int(number, 104);
export const int112 = (number: Input): Int => new Int(number, 112);
export const int120 = (number: Input): Int => new Int(number, 120);
export const int128 = (number: Input): Int => new Int(number, 128);
export const int136 = (number: Input): Int => new Int(number, 136);
export const int144 = (number: Input): Int => new Int(number, 144);
export const int152 = (number: Input): Int => new Int(number, 152);
export const int160 = (number: Input): Int => new Int(number, 160);
export const int168 = (number: Input): Int => new Int(number, 168);
export const int176 = (number: Input): Int => new Int(number, 176);
export const int184 = (number: Input): Int => new Int(number, 184);
export const int192 = (number: Input): Int => new Int(number, 192);
export const int200 = (number: Input): Int => new Int(number, 200);
export const int208 = (number: Input): Int => new Int(number, 208);
export const int216 = (number: Input): Int => new Int(number, 216);
export const int224 = (number: Input): Int => new Int(number, 224);
export const int232 = (number: Input): Int => new Int(number, 232);
export const int240 = (number: Input): Int => new Int(number, 240);
export const int248 = (number: Input): Int => new Int(number, 248);
export const int256 = (number: Input): Int => new Int(number, 256);