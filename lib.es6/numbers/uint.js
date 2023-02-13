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
/** @description Unsigned integer base class */
var Uint = /** @class */ (function (_super) {
    __extends(Uint, _super);
    function Uint(number, bitlen) {
        return _super.call(this, number, bitlen, false) || this;
    }
    Object.defineProperty(Uint.prototype, "_ubound", {
        get: function () {
            return C._getBitValues(this._bitlen).uintmax;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Uint.prototype, "_lbound", {
        get: function () {
            return C._getBitValues(this._bitlen).uintmin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Uint.prototype, "type", {
        get: function () {
            return "uint".concat(this._bitlen);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description performs unsigned integer wraparound in-place
     */
    Uint.prototype._iwraparound = function () {
        this.bn = this.bn.mod(this._ubound.add(C.BN1));
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(C.BN1);
        }
        return this;
    };
    return Uint;
}(BaseInteger));
export { Uint };
export var uint8 = function (number) { return new Uint(number, 8); };
export var uint16 = function (number) { return new Uint(number, 16); };
export var uint24 = function (number) { return new Uint(number, 24); };
export var uint32 = function (number) { return new Uint(number, 32); };
export var uint40 = function (number) { return new Uint(number, 40); };
export var uint48 = function (number) { return new Uint(number, 48); };
export var uint56 = function (number) { return new Uint(number, 56); };
export var uint64 = function (number) { return new Uint(number, 64); };
export var uint72 = function (number) { return new Uint(number, 72); };
export var uint80 = function (number) { return new Uint(number, 80); };
export var uint88 = function (number) { return new Uint(number, 88); };
export var uint96 = function (number) { return new Uint(number, 96); };
export var uint104 = function (number) { return new Uint(number, 104); };
export var uint112 = function (number) { return new Uint(number, 112); };
export var uint120 = function (number) { return new Uint(number, 120); };
export var uint128 = function (number) { return new Uint(number, 128); };
export var uint136 = function (number) { return new Uint(number, 136); };
export var uint144 = function (number) { return new Uint(number, 144); };
export var uint152 = function (number) { return new Uint(number, 152); };
export var uint160 = function (number) { return new Uint(number, 160); };
export var uint168 = function (number) { return new Uint(number, 168); };
export var uint176 = function (number) { return new Uint(number, 176); };
export var uint184 = function (number) { return new Uint(number, 184); };
export var uint192 = function (number) { return new Uint(number, 192); };
export var uint200 = function (number) { return new Uint(number, 200); };
export var uint208 = function (number) { return new Uint(number, 208); };
export var uint216 = function (number) { return new Uint(number, 216); };
export var uint224 = function (number) { return new Uint(number, 224); };
export var uint232 = function (number) { return new Uint(number, 232); };
export var uint240 = function (number) { return new Uint(number, 240); };
export var uint248 = function (number) { return new Uint(number, 248); };
export var uint256 = function (number) { return new Uint(number, 256); };
