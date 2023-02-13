import * as C from "../constants";
import { BaseInteger, BNInput } from "./base";

/** @description Signed integer base class */
export class BaseInt extends BaseInteger {
    /** 
     * @description performs signed integer wraparound in-place
     */
    _iwraparound(): this {
        const range = this._ubound.sub(this._lbound).add(C.BN1);
        this.bn = this.bn.sub(this._lbound).mod(range);
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(C.BN1);
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

export const int8 = (number: BNInput): BaseInt => new BaseInt(number, 8, true);
export const int16 = (number: BNInput): BaseInt => new BaseInt(number, 16, true);
export const int24 = (number: BNInput): BaseInt => new BaseInt(number, 24, true);
export const int32 = (number: BNInput): BaseInt => new BaseInt(number, 32, true);
export const int40 = (number: BNInput): BaseInt => new BaseInt(number, 40, true);
export const int48 = (number: BNInput): BaseInt => new BaseInt(number, 48, true);
export const int56 = (number: BNInput): BaseInt => new BaseInt(number, 56, true);
export const int64 = (number: BNInput): BaseInt => new BaseInt(number, 64, true);
export const int72 = (number: BNInput): BaseInt => new BaseInt(number, 72, true);
export const int80 = (number: BNInput): BaseInt => new BaseInt(number, 80, true);
export const int88 = (number: BNInput): BaseInt => new BaseInt(number, 88, true);
export const int96 = (number: BNInput): BaseInt => new BaseInt(number, 96, true);
export const int104 = (number: BNInput): BaseInt => new BaseInt(number, 104, true);
export const int112 = (number: BNInput): BaseInt => new BaseInt(number, 112, true);
export const int120 = (number: BNInput): BaseInt => new BaseInt(number, 120, true);
export const int128 = (number: BNInput): BaseInt => new BaseInt(number, 128, true);
export const int136 = (number: BNInput): BaseInt => new BaseInt(number, 136, true);
export const int144 = (number: BNInput): BaseInt => new BaseInt(number, 144, true);
export const int152 = (number: BNInput): BaseInt => new BaseInt(number, 152, true);
export const int160 = (number: BNInput): BaseInt => new BaseInt(number, 160, true);
export const int168 = (number: BNInput): BaseInt => new BaseInt(number, 168, true);
export const int176 = (number: BNInput): BaseInt => new BaseInt(number, 176, true);
export const int184 = (number: BNInput): BaseInt => new BaseInt(number, 184, true);
export const int192 = (number: BNInput): BaseInt => new BaseInt(number, 192, true);
export const int200 = (number: BNInput): BaseInt => new BaseInt(number, 200, true);
export const int208 = (number: BNInput): BaseInt => new BaseInt(number, 208, true);
export const int216 = (number: BNInput): BaseInt => new BaseInt(number, 216, true);
export const int224 = (number: BNInput): BaseInt => new BaseInt(number, 224, true);
export const int232 = (number: BNInput): BaseInt => new BaseInt(number, 232, true);
export const int240 = (number: BNInput): BaseInt => new BaseInt(number, 240, true);
export const int248 = (number: BNInput): BaseInt => new BaseInt(number, 248, true);
export const int256 = (number: BNInput): BaseInt => new BaseInt(number, 256, true);