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
/** @description Unsigned integer base class */
var BaseUint = /** @class */ (function (_super) {
    __extends(BaseUint, _super);
    function BaseUint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseUint, "_ubound", {
        get: function () {
            return C._getBitValues(this._bitlen).uintmax;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseUint, "_lbound", {
        get: function () {
            return C.BN0; // lower bound for uint is always 0
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description performs unsigned integer wraparound in-place
     */
    BaseUint.prototype._iwraparound = function () {
        this.bn = this.bn.mod(this._ubound.add(C.BN1));
        if (this.bn.isNeg()) {
            this.bn = this.bn.add(this._ubound).add(C.BN1);
        }
        return this;
    };
    BaseUint._signed = false;
    return BaseUint;
}(BaseNumber));
export { BaseUint };
var Uint8 = /** @class */ (function (_super) {
    __extends(Uint8, _super);
    function Uint8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint8._bitlen = 8;
    return Uint8;
}(BaseUint));
export { Uint8 };
var Uint16 = /** @class */ (function (_super) {
    __extends(Uint16, _super);
    function Uint16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint16._bitlen = 16;
    return Uint16;
}(BaseUint));
export { Uint16 };
var Uint24 = /** @class */ (function (_super) {
    __extends(Uint24, _super);
    function Uint24() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint24._bitlen = 24;
    return Uint24;
}(BaseUint));
export { Uint24 };
var Uint32 = /** @class */ (function (_super) {
    __extends(Uint32, _super);
    function Uint32() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint32._bitlen = 32;
    return Uint32;
}(BaseUint));
export { Uint32 };
var Uint40 = /** @class */ (function (_super) {
    __extends(Uint40, _super);
    function Uint40() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint40._bitlen = 40;
    return Uint40;
}(BaseUint));
export { Uint40 };
var Uint48 = /** @class */ (function (_super) {
    __extends(Uint48, _super);
    function Uint48() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint48._bitlen = 48;
    return Uint48;
}(BaseUint));
export { Uint48 };
var Uint56 = /** @class */ (function (_super) {
    __extends(Uint56, _super);
    function Uint56() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint56._bitlen = 56;
    return Uint56;
}(BaseUint));
export { Uint56 };
var Uint64 = /** @class */ (function (_super) {
    __extends(Uint64, _super);
    function Uint64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint64._bitlen = 64;
    return Uint64;
}(BaseUint));
export { Uint64 };
var Uint72 = /** @class */ (function (_super) {
    __extends(Uint72, _super);
    function Uint72() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint72._bitlen = 72;
    return Uint72;
}(BaseUint));
export { Uint72 };
var Uint80 = /** @class */ (function (_super) {
    __extends(Uint80, _super);
    function Uint80() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint80._bitlen = 80;
    return Uint80;
}(BaseUint));
export { Uint80 };
var Uint88 = /** @class */ (function (_super) {
    __extends(Uint88, _super);
    function Uint88() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint88._bitlen = 88;
    return Uint88;
}(BaseUint));
export { Uint88 };
var Uint96 = /** @class */ (function (_super) {
    __extends(Uint96, _super);
    function Uint96() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint96._bitlen = 96;
    return Uint96;
}(BaseUint));
export { Uint96 };
var Uint104 = /** @class */ (function (_super) {
    __extends(Uint104, _super);
    function Uint104() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint104._bitlen = 104;
    return Uint104;
}(BaseUint));
export { Uint104 };
var Uint112 = /** @class */ (function (_super) {
    __extends(Uint112, _super);
    function Uint112() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint112._bitlen = 112;
    return Uint112;
}(BaseUint));
export { Uint112 };
var Uint120 = /** @class */ (function (_super) {
    __extends(Uint120, _super);
    function Uint120() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint120._bitlen = 120;
    return Uint120;
}(BaseUint));
export { Uint120 };
var Uint128 = /** @class */ (function (_super) {
    __extends(Uint128, _super);
    function Uint128() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint128._bitlen = 128;
    return Uint128;
}(BaseUint));
export { Uint128 };
var Uint136 = /** @class */ (function (_super) {
    __extends(Uint136, _super);
    function Uint136() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint136._bitlen = 136;
    return Uint136;
}(BaseUint));
export { Uint136 };
var Uint144 = /** @class */ (function (_super) {
    __extends(Uint144, _super);
    function Uint144() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint144._bitlen = 144;
    return Uint144;
}(BaseUint));
export { Uint144 };
var Uint152 = /** @class */ (function (_super) {
    __extends(Uint152, _super);
    function Uint152() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint152._bitlen = 152;
    return Uint152;
}(BaseUint));
export { Uint152 };
var Uint160 = /** @class */ (function (_super) {
    __extends(Uint160, _super);
    function Uint160() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint160._bitlen = 160;
    return Uint160;
}(BaseUint));
export { Uint160 };
var Uint168 = /** @class */ (function (_super) {
    __extends(Uint168, _super);
    function Uint168() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint168._bitlen = 168;
    return Uint168;
}(BaseUint));
export { Uint168 };
var Uint176 = /** @class */ (function (_super) {
    __extends(Uint176, _super);
    function Uint176() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint176._bitlen = 176;
    return Uint176;
}(BaseUint));
export { Uint176 };
var Uint184 = /** @class */ (function (_super) {
    __extends(Uint184, _super);
    function Uint184() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint184._bitlen = 184;
    return Uint184;
}(BaseUint));
export { Uint184 };
var Uint192 = /** @class */ (function (_super) {
    __extends(Uint192, _super);
    function Uint192() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint192._bitlen = 192;
    return Uint192;
}(BaseUint));
export { Uint192 };
var Uint200 = /** @class */ (function (_super) {
    __extends(Uint200, _super);
    function Uint200() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint200._bitlen = 200;
    return Uint200;
}(BaseUint));
export { Uint200 };
var Uint208 = /** @class */ (function (_super) {
    __extends(Uint208, _super);
    function Uint208() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint208._bitlen = 208;
    return Uint208;
}(BaseUint));
export { Uint208 };
var Uint216 = /** @class */ (function (_super) {
    __extends(Uint216, _super);
    function Uint216() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint216._bitlen = 216;
    return Uint216;
}(BaseUint));
export { Uint216 };
var Uint224 = /** @class */ (function (_super) {
    __extends(Uint224, _super);
    function Uint224() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint224._bitlen = 224;
    return Uint224;
}(BaseUint));
export { Uint224 };
var Uint232 = /** @class */ (function (_super) {
    __extends(Uint232, _super);
    function Uint232() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint232._bitlen = 232;
    return Uint232;
}(BaseUint));
export { Uint232 };
var Uint240 = /** @class */ (function (_super) {
    __extends(Uint240, _super);
    function Uint240() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint240._bitlen = 240;
    return Uint240;
}(BaseUint));
export { Uint240 };
var Uint248 = /** @class */ (function (_super) {
    __extends(Uint248, _super);
    function Uint248() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint248._bitlen = 248;
    return Uint248;
}(BaseUint));
export { Uint248 };
var Uint256 = /** @class */ (function (_super) {
    __extends(Uint256, _super);
    function Uint256() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint256._bitlen = 256;
    return Uint256;
}(BaseUint));
export { Uint256 };
// alias functions
export var uint8 = function (number) { return Uint8._new(number); };
export var uint16 = function (number) { return Uint16._new(number); };
export var uint24 = function (number) { return Uint24._new(number); };
export var uint32 = function (number) { return Uint32._new(number); };
export var uint40 = function (number) { return Uint40._new(number); };
export var uint48 = function (number) { return Uint48._new(number); };
export var uint56 = function (number) { return Uint56._new(number); };
export var uint64 = function (number) { return Uint64._new(number); };
export var uint72 = function (number) { return Uint72._new(number); };
export var uint80 = function (number) { return Uint80._new(number); };
export var uint88 = function (number) { return Uint88._new(number); };
export var uint96 = function (number) { return Uint96._new(number); };
export var uint104 = function (number) { return Uint104._new(number); };
export var uint112 = function (number) { return Uint112._new(number); };
export var uint120 = function (number) { return Uint120._new(number); };
export var uint128 = function (number) { return Uint128._new(number); };
export var uint136 = function (number) { return Uint136._new(number); };
export var uint144 = function (number) { return Uint144._new(number); };
export var uint152 = function (number) { return Uint152._new(number); };
export var uint160 = function (number) { return Uint160._new(number); };
export var uint168 = function (number) { return Uint168._new(number); };
export var uint176 = function (number) { return Uint176._new(number); };
export var uint184 = function (number) { return Uint184._new(number); };
export var uint192 = function (number) { return Uint192._new(number); };
export var uint200 = function (number) { return Uint200._new(number); };
export var uint208 = function (number) { return Uint208._new(number); };
export var uint216 = function (number) { return Uint216._new(number); };
export var uint224 = function (number) { return Uint224._new(number); };
export var uint232 = function (number) { return Uint232._new(number); };
export var uint240 = function (number) { return Uint240._new(number); };
export var uint248 = function (number) { return Uint248._new(number); };
export var uint256 = function (number) { return Uint256._new(number); };
