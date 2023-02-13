"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint256 = exports.uint248 = exports.uint240 = exports.uint232 = exports.uint224 = exports.uint216 = exports.uint208 = exports.uint200 = exports.uint192 = exports.uint184 = exports.uint176 = exports.uint168 = exports.uint160 = exports.uint152 = exports.uint144 = exports.uint136 = exports.uint128 = exports.uint120 = exports.uint112 = exports.uint104 = exports.uint96 = exports.uint88 = exports.uint80 = exports.uint72 = exports.uint64 = exports.uint56 = exports.uint48 = exports.uint40 = exports.uint32 = exports.uint24 = exports.uint16 = exports.uint8 = exports.Uint = void 0;
var C = __importStar(require("../constants"));
var base_1 = require("./base");
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
}(base_1.BaseInteger));
exports.Uint = Uint;
var uint8 = function (number) { return new Uint(number, 8); };
exports.uint8 = uint8;
var uint16 = function (number) { return new Uint(number, 16); };
exports.uint16 = uint16;
var uint24 = function (number) { return new Uint(number, 24); };
exports.uint24 = uint24;
var uint32 = function (number) { return new Uint(number, 32); };
exports.uint32 = uint32;
var uint40 = function (number) { return new Uint(number, 40); };
exports.uint40 = uint40;
var uint48 = function (number) { return new Uint(number, 48); };
exports.uint48 = uint48;
var uint56 = function (number) { return new Uint(number, 56); };
exports.uint56 = uint56;
var uint64 = function (number) { return new Uint(number, 64); };
exports.uint64 = uint64;
var uint72 = function (number) { return new Uint(number, 72); };
exports.uint72 = uint72;
var uint80 = function (number) { return new Uint(number, 80); };
exports.uint80 = uint80;
var uint88 = function (number) { return new Uint(number, 88); };
exports.uint88 = uint88;
var uint96 = function (number) { return new Uint(number, 96); };
exports.uint96 = uint96;
var uint104 = function (number) { return new Uint(number, 104); };
exports.uint104 = uint104;
var uint112 = function (number) { return new Uint(number, 112); };
exports.uint112 = uint112;
var uint120 = function (number) { return new Uint(number, 120); };
exports.uint120 = uint120;
var uint128 = function (number) { return new Uint(number, 128); };
exports.uint128 = uint128;
var uint136 = function (number) { return new Uint(number, 136); };
exports.uint136 = uint136;
var uint144 = function (number) { return new Uint(number, 144); };
exports.uint144 = uint144;
var uint152 = function (number) { return new Uint(number, 152); };
exports.uint152 = uint152;
var uint160 = function (number) { return new Uint(number, 160); };
exports.uint160 = uint160;
var uint168 = function (number) { return new Uint(number, 168); };
exports.uint168 = uint168;
var uint176 = function (number) { return new Uint(number, 176); };
exports.uint176 = uint176;
var uint184 = function (number) { return new Uint(number, 184); };
exports.uint184 = uint184;
var uint192 = function (number) { return new Uint(number, 192); };
exports.uint192 = uint192;
var uint200 = function (number) { return new Uint(number, 200); };
exports.uint200 = uint200;
var uint208 = function (number) { return new Uint(number, 208); };
exports.uint208 = uint208;
var uint216 = function (number) { return new Uint(number, 216); };
exports.uint216 = uint216;
var uint224 = function (number) { return new Uint(number, 224); };
exports.uint224 = uint224;
var uint232 = function (number) { return new Uint(number, 232); };
exports.uint232 = uint232;
var uint240 = function (number) { return new Uint(number, 240); };
exports.uint240 = uint240;
var uint248 = function (number) { return new Uint(number, 248); };
exports.uint248 = uint248;
var uint256 = function (number) { return new Uint(number, 256); };
exports.uint256 = uint256;
