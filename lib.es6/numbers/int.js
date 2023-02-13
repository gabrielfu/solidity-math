var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as C from "../constants";
import { BaseInteger } from "./base";
/** @description Signed integer base class */
var Int = /** @class */ (function (_super) {
    __extends(Int, _super);
    function Int(number, bitlen) {
        return _super.call(this, number, bitlen, true) || this;
    }
    Object.defineProperty(Int.prototype, "_ubound", {
        get: function () {
            return C._getBitValues(this._bitlen).intmax;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Int.prototype, "_lbound", {
        get: function () {
            return C._getBitValues(this._bitlen).intmin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Int.prototype, "type", {
        get: function () {
            return "int".concat(this._bitlen);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description performs signed integer wraparound in-place
     */
    Int.prototype._iwraparound = function () {
        var range = this._ubound.sub(this._lbound).add(C.BN1);
        this.bn = this.bn.sub(this._lbound).mod(range);
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(C.BN1);
        }
        else {
            this.bn = this.bn.add(this._lbound);
        }
        return this;
    };
    Int.prototype.neg = function () {
        var r = this.clone();
        r.bn = r.bn.neg();
        return r._checkBounds();
    };
    return Int;
}(BaseInteger));
export { Int };
export var int8 = function (number) { return new Int(number, 8); };
export var int16 = function (number) { return new Int(number, 16); };
export var int24 = function (number) { return new Int(number, 24); };
export var int32 = function (number) { return new Int(number, 32); };
export var int40 = function (number) { return new Int(number, 40); };
export var int48 = function (number) { return new Int(number, 48); };
export var int56 = function (number) { return new Int(number, 56); };
export var int64 = function (number) { return new Int(number, 64); };
export var int72 = function (number) { return new Int(number, 72); };
export var int80 = function (number) { return new Int(number, 80); };
export var int88 = function (number) { return new Int(number, 88); };
export var int96 = function (number) { return new Int(number, 96); };
export var int104 = function (number) { return new Int(number, 104); };
export var int112 = function (number) { return new Int(number, 112); };
export var int120 = function (number) { return new Int(number, 120); };
export var int128 = function (number) { return new Int(number, 128); };
export var int136 = function (number) { return new Int(number, 136); };
export var int144 = function (number) { return new Int(number, 144); };
export var int152 = function (number) { return new Int(number, 152); };
export var int160 = function (number) { return new Int(number, 160); };
export var int168 = function (number) { return new Int(number, 168); };
export var int176 = function (number) { return new Int(number, 176); };
export var int184 = function (number) { return new Int(number, 184); };
export var int192 = function (number) { return new Int(number, 192); };
export var int200 = function (number) { return new Int(number, 200); };
export var int208 = function (number) { return new Int(number, 208); };
export var int216 = function (number) { return new Int(number, 216); };
export var int224 = function (number) { return new Int(number, 224); };
export var int232 = function (number) { return new Int(number, 232); };
export var int240 = function (number) { return new Int(number, 240); };
export var int248 = function (number) { return new Int(number, 248); };
export var int256 = function (number) { return new Int(number, 256); };
