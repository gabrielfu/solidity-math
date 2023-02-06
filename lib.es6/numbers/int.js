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
import { BaseNumber } from "./base";
/** @description Signed integer base class */
var BaseInt = /** @class */ (function (_super) {
    __extends(BaseInt, _super);
    function BaseInt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseInt, "_ubound", {
        get: function () {
            return C._getBitValues(this._bitlen).intmax;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseInt, "_lbound", {
        get: function () {
            return C._getBitValues(this._bitlen).intmin;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description performs signed integer wraparound in-place
     */
    BaseInt.prototype._iwraparound = function () {
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
    BaseInt.prototype.neg = function () {
        var r = this.clone();
        r.bn = r.bn.neg();
        return r._checkBounds();
    };
    BaseInt._signed = true;
    return BaseInt;
}(BaseNumber));
export { BaseInt };
var Int8 = /** @class */ (function (_super) {
    __extends(Int8, _super);
    function Int8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int8._bitlen = 8;
    return Int8;
}(BaseInt));
export { Int8 };
var Int16 = /** @class */ (function (_super) {
    __extends(Int16, _super);
    function Int16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int16._bitlen = 16;
    return Int16;
}(BaseInt));
export { Int16 };
var Int24 = /** @class */ (function (_super) {
    __extends(Int24, _super);
    function Int24() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int24._bitlen = 24;
    return Int24;
}(BaseInt));
export { Int24 };
var Int32 = /** @class */ (function (_super) {
    __extends(Int32, _super);
    function Int32() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int32._bitlen = 32;
    return Int32;
}(BaseInt));
export { Int32 };
var Int40 = /** @class */ (function (_super) {
    __extends(Int40, _super);
    function Int40() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int40._bitlen = 40;
    return Int40;
}(BaseInt));
export { Int40 };
var Int48 = /** @class */ (function (_super) {
    __extends(Int48, _super);
    function Int48() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int48._bitlen = 48;
    return Int48;
}(BaseInt));
export { Int48 };
var Int56 = /** @class */ (function (_super) {
    __extends(Int56, _super);
    function Int56() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int56._bitlen = 56;
    return Int56;
}(BaseInt));
export { Int56 };
var Int64 = /** @class */ (function (_super) {
    __extends(Int64, _super);
    function Int64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int64._bitlen = 64;
    return Int64;
}(BaseInt));
export { Int64 };
var Int72 = /** @class */ (function (_super) {
    __extends(Int72, _super);
    function Int72() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int72._bitlen = 72;
    return Int72;
}(BaseInt));
export { Int72 };
var Int80 = /** @class */ (function (_super) {
    __extends(Int80, _super);
    function Int80() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int80._bitlen = 80;
    return Int80;
}(BaseInt));
export { Int80 };
var Int88 = /** @class */ (function (_super) {
    __extends(Int88, _super);
    function Int88() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int88._bitlen = 88;
    return Int88;
}(BaseInt));
export { Int88 };
var Int96 = /** @class */ (function (_super) {
    __extends(Int96, _super);
    function Int96() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int96._bitlen = 96;
    return Int96;
}(BaseInt));
export { Int96 };
var Int104 = /** @class */ (function (_super) {
    __extends(Int104, _super);
    function Int104() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int104._bitlen = 104;
    return Int104;
}(BaseInt));
export { Int104 };
var Int112 = /** @class */ (function (_super) {
    __extends(Int112, _super);
    function Int112() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int112._bitlen = 112;
    return Int112;
}(BaseInt));
export { Int112 };
var Int120 = /** @class */ (function (_super) {
    __extends(Int120, _super);
    function Int120() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int120._bitlen = 120;
    return Int120;
}(BaseInt));
export { Int120 };
var Int128 = /** @class */ (function (_super) {
    __extends(Int128, _super);
    function Int128() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int128._bitlen = 128;
    return Int128;
}(BaseInt));
export { Int128 };
var Int136 = /** @class */ (function (_super) {
    __extends(Int136, _super);
    function Int136() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int136._bitlen = 136;
    return Int136;
}(BaseInt));
export { Int136 };
var Int144 = /** @class */ (function (_super) {
    __extends(Int144, _super);
    function Int144() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int144._bitlen = 144;
    return Int144;
}(BaseInt));
export { Int144 };
var Int152 = /** @class */ (function (_super) {
    __extends(Int152, _super);
    function Int152() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int152._bitlen = 152;
    return Int152;
}(BaseInt));
export { Int152 };
var Int160 = /** @class */ (function (_super) {
    __extends(Int160, _super);
    function Int160() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int160._bitlen = 160;
    return Int160;
}(BaseInt));
export { Int160 };
var Int168 = /** @class */ (function (_super) {
    __extends(Int168, _super);
    function Int168() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int168._bitlen = 168;
    return Int168;
}(BaseInt));
export { Int168 };
var Int176 = /** @class */ (function (_super) {
    __extends(Int176, _super);
    function Int176() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int176._bitlen = 176;
    return Int176;
}(BaseInt));
export { Int176 };
var Int184 = /** @class */ (function (_super) {
    __extends(Int184, _super);
    function Int184() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int184._bitlen = 184;
    return Int184;
}(BaseInt));
export { Int184 };
var Int192 = /** @class */ (function (_super) {
    __extends(Int192, _super);
    function Int192() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int192._bitlen = 192;
    return Int192;
}(BaseInt));
export { Int192 };
var Int200 = /** @class */ (function (_super) {
    __extends(Int200, _super);
    function Int200() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int200._bitlen = 200;
    return Int200;
}(BaseInt));
export { Int200 };
var Int208 = /** @class */ (function (_super) {
    __extends(Int208, _super);
    function Int208() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int208._bitlen = 208;
    return Int208;
}(BaseInt));
export { Int208 };
var Int216 = /** @class */ (function (_super) {
    __extends(Int216, _super);
    function Int216() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int216._bitlen = 216;
    return Int216;
}(BaseInt));
export { Int216 };
var Int224 = /** @class */ (function (_super) {
    __extends(Int224, _super);
    function Int224() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int224._bitlen = 224;
    return Int224;
}(BaseInt));
export { Int224 };
var Int232 = /** @class */ (function (_super) {
    __extends(Int232, _super);
    function Int232() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int232._bitlen = 232;
    return Int232;
}(BaseInt));
export { Int232 };
var Int240 = /** @class */ (function (_super) {
    __extends(Int240, _super);
    function Int240() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int240._bitlen = 240;
    return Int240;
}(BaseInt));
export { Int240 };
var Int248 = /** @class */ (function (_super) {
    __extends(Int248, _super);
    function Int248() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int248._bitlen = 248;
    return Int248;
}(BaseInt));
export { Int248 };
var Int256 = /** @class */ (function (_super) {
    __extends(Int256, _super);
    function Int256() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Int256._bitlen = 256;
    return Int256;
}(BaseInt));
export { Int256 };
// alias functions
export var int8 = function (number) { return Int8._new(number); };
export var int16 = function (number) { return Int16._new(number); };
export var int24 = function (number) { return Int24._new(number); };
export var int32 = function (number) { return Int32._new(number); };
export var int40 = function (number) { return Int40._new(number); };
export var int48 = function (number) { return Int48._new(number); };
export var int56 = function (number) { return Int56._new(number); };
export var int64 = function (number) { return Int64._new(number); };
export var int72 = function (number) { return Int72._new(number); };
export var int80 = function (number) { return Int80._new(number); };
export var int88 = function (number) { return Int88._new(number); };
export var int96 = function (number) { return Int96._new(number); };
export var int104 = function (number) { return Int104._new(number); };
export var int112 = function (number) { return Int112._new(number); };
export var int120 = function (number) { return Int120._new(number); };
export var int128 = function (number) { return Int128._new(number); };
export var int136 = function (number) { return Int136._new(number); };
export var int144 = function (number) { return Int144._new(number); };
export var int152 = function (number) { return Int152._new(number); };
export var int160 = function (number) { return Int160._new(number); };
export var int168 = function (number) { return Int168._new(number); };
export var int176 = function (number) { return Int176._new(number); };
export var int184 = function (number) { return Int184._new(number); };
export var int192 = function (number) { return Int192._new(number); };
export var int200 = function (number) { return Int200._new(number); };
export var int208 = function (number) { return Int208._new(number); };
export var int216 = function (number) { return Int216._new(number); };
export var int224 = function (number) { return Int224._new(number); };
export var int232 = function (number) { return Int232._new(number); };
export var int240 = function (number) { return Int240._new(number); };
export var int248 = function (number) { return Int248._new(number); };
export var int256 = function (number) { return Int256._new(number); };
