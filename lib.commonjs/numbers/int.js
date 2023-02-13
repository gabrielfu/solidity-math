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
exports.int256 = exports.int248 = exports.int240 = exports.int232 = exports.int224 = exports.int216 = exports.int208 = exports.int200 = exports.int192 = exports.int184 = exports.int176 = exports.int168 = exports.int160 = exports.int152 = exports.int144 = exports.int136 = exports.int128 = exports.int120 = exports.int112 = exports.int104 = exports.int96 = exports.int88 = exports.int80 = exports.int72 = exports.int64 = exports.int56 = exports.int48 = exports.int40 = exports.int32 = exports.int24 = exports.int16 = exports.int8 = exports.Int = void 0;
var C = __importStar(require("../constants"));
var base_1 = require("./base");
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
}(base_1.BaseInteger));
exports.Int = Int;
var int8 = function (number) { return new Int(number, 8); };
exports.int8 = int8;
var int16 = function (number) { return new Int(number, 16); };
exports.int16 = int16;
var int24 = function (number) { return new Int(number, 24); };
exports.int24 = int24;
var int32 = function (number) { return new Int(number, 32); };
exports.int32 = int32;
var int40 = function (number) { return new Int(number, 40); };
exports.int40 = int40;
var int48 = function (number) { return new Int(number, 48); };
exports.int48 = int48;
var int56 = function (number) { return new Int(number, 56); };
exports.int56 = int56;
var int64 = function (number) { return new Int(number, 64); };
exports.int64 = int64;
var int72 = function (number) { return new Int(number, 72); };
exports.int72 = int72;
var int80 = function (number) { return new Int(number, 80); };
exports.int80 = int80;
var int88 = function (number) { return new Int(number, 88); };
exports.int88 = int88;
var int96 = function (number) { return new Int(number, 96); };
exports.int96 = int96;
var int104 = function (number) { return new Int(number, 104); };
exports.int104 = int104;
var int112 = function (number) { return new Int(number, 112); };
exports.int112 = int112;
var int120 = function (number) { return new Int(number, 120); };
exports.int120 = int120;
var int128 = function (number) { return new Int(number, 128); };
exports.int128 = int128;
var int136 = function (number) { return new Int(number, 136); };
exports.int136 = int136;
var int144 = function (number) { return new Int(number, 144); };
exports.int144 = int144;
var int152 = function (number) { return new Int(number, 152); };
exports.int152 = int152;
var int160 = function (number) { return new Int(number, 160); };
exports.int160 = int160;
var int168 = function (number) { return new Int(number, 168); };
exports.int168 = int168;
var int176 = function (number) { return new Int(number, 176); };
exports.int176 = int176;
var int184 = function (number) { return new Int(number, 184); };
exports.int184 = int184;
var int192 = function (number) { return new Int(number, 192); };
exports.int192 = int192;
var int200 = function (number) { return new Int(number, 200); };
exports.int200 = int200;
var int208 = function (number) { return new Int(number, 208); };
exports.int208 = int208;
var int216 = function (number) { return new Int(number, 216); };
exports.int216 = int216;
var int224 = function (number) { return new Int(number, 224); };
exports.int224 = int224;
var int232 = function (number) { return new Int(number, 232); };
exports.int232 = int232;
var int240 = function (number) { return new Int(number, 240); };
exports.int240 = int240;
var int248 = function (number) { return new Int(number, 248); };
exports.int248 = int248;
var int256 = function (number) { return new Int(number, 256); };
exports.int256 = int256;
