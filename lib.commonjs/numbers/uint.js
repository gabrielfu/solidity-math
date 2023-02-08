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
exports.uint136 = exports.uint128 = exports.uint120 = exports.uint112 = exports.uint104 = exports.uint96 = exports.uint88 = exports.uint80 = exports.uint72 = exports.uint64 = exports.uint56 = exports.uint48 = exports.uint40 = exports.uint32 = exports.uint24 = exports.uint16 = exports.uint8 = exports.Uint256 = exports.Uint248 = exports.Uint240 = exports.Uint232 = exports.Uint224 = exports.Uint216 = exports.Uint208 = exports.Uint200 = exports.Uint192 = exports.Uint184 = exports.Uint176 = exports.Uint168 = exports.Uint160 = exports.Uint152 = exports.Uint144 = exports.Uint136 = exports.Uint128 = exports.Uint120 = exports.Uint112 = exports.Uint104 = exports.Uint96 = exports.Uint88 = exports.Uint80 = exports.Uint72 = exports.Uint64 = exports.Uint56 = exports.Uint48 = exports.Uint40 = exports.Uint32 = exports.Uint24 = exports.Uint16 = exports.Uint8 = exports.BaseUint = void 0;
exports.uint256 = exports.uint248 = exports.uint240 = exports.uint232 = exports.uint224 = exports.uint216 = exports.uint208 = exports.uint200 = exports.uint192 = exports.uint184 = exports.uint176 = exports.uint168 = exports.uint160 = exports.uint152 = exports.uint144 = void 0;
var C = __importStar(require("../constants"));
var base_1 = require("./base");
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
}(base_1.BaseNumber));
exports.BaseUint = BaseUint;
var Uint8 = /** @class */ (function (_super) {
    __extends(Uint8, _super);
    function Uint8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint8._bitlen = 8;
    return Uint8;
}(BaseUint));
exports.Uint8 = Uint8;
var Uint16 = /** @class */ (function (_super) {
    __extends(Uint16, _super);
    function Uint16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint16._bitlen = 16;
    return Uint16;
}(BaseUint));
exports.Uint16 = Uint16;
var Uint24 = /** @class */ (function (_super) {
    __extends(Uint24, _super);
    function Uint24() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint24._bitlen = 24;
    return Uint24;
}(BaseUint));
exports.Uint24 = Uint24;
var Uint32 = /** @class */ (function (_super) {
    __extends(Uint32, _super);
    function Uint32() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint32._bitlen = 32;
    return Uint32;
}(BaseUint));
exports.Uint32 = Uint32;
var Uint40 = /** @class */ (function (_super) {
    __extends(Uint40, _super);
    function Uint40() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint40._bitlen = 40;
    return Uint40;
}(BaseUint));
exports.Uint40 = Uint40;
var Uint48 = /** @class */ (function (_super) {
    __extends(Uint48, _super);
    function Uint48() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint48._bitlen = 48;
    return Uint48;
}(BaseUint));
exports.Uint48 = Uint48;
var Uint56 = /** @class */ (function (_super) {
    __extends(Uint56, _super);
    function Uint56() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint56._bitlen = 56;
    return Uint56;
}(BaseUint));
exports.Uint56 = Uint56;
var Uint64 = /** @class */ (function (_super) {
    __extends(Uint64, _super);
    function Uint64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint64._bitlen = 64;
    return Uint64;
}(BaseUint));
exports.Uint64 = Uint64;
var Uint72 = /** @class */ (function (_super) {
    __extends(Uint72, _super);
    function Uint72() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint72._bitlen = 72;
    return Uint72;
}(BaseUint));
exports.Uint72 = Uint72;
var Uint80 = /** @class */ (function (_super) {
    __extends(Uint80, _super);
    function Uint80() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint80._bitlen = 80;
    return Uint80;
}(BaseUint));
exports.Uint80 = Uint80;
var Uint88 = /** @class */ (function (_super) {
    __extends(Uint88, _super);
    function Uint88() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint88._bitlen = 88;
    return Uint88;
}(BaseUint));
exports.Uint88 = Uint88;
var Uint96 = /** @class */ (function (_super) {
    __extends(Uint96, _super);
    function Uint96() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint96._bitlen = 96;
    return Uint96;
}(BaseUint));
exports.Uint96 = Uint96;
var Uint104 = /** @class */ (function (_super) {
    __extends(Uint104, _super);
    function Uint104() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint104._bitlen = 104;
    return Uint104;
}(BaseUint));
exports.Uint104 = Uint104;
var Uint112 = /** @class */ (function (_super) {
    __extends(Uint112, _super);
    function Uint112() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint112._bitlen = 112;
    return Uint112;
}(BaseUint));
exports.Uint112 = Uint112;
var Uint120 = /** @class */ (function (_super) {
    __extends(Uint120, _super);
    function Uint120() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint120._bitlen = 120;
    return Uint120;
}(BaseUint));
exports.Uint120 = Uint120;
var Uint128 = /** @class */ (function (_super) {
    __extends(Uint128, _super);
    function Uint128() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint128._bitlen = 128;
    return Uint128;
}(BaseUint));
exports.Uint128 = Uint128;
var Uint136 = /** @class */ (function (_super) {
    __extends(Uint136, _super);
    function Uint136() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint136._bitlen = 136;
    return Uint136;
}(BaseUint));
exports.Uint136 = Uint136;
var Uint144 = /** @class */ (function (_super) {
    __extends(Uint144, _super);
    function Uint144() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint144._bitlen = 144;
    return Uint144;
}(BaseUint));
exports.Uint144 = Uint144;
var Uint152 = /** @class */ (function (_super) {
    __extends(Uint152, _super);
    function Uint152() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint152._bitlen = 152;
    return Uint152;
}(BaseUint));
exports.Uint152 = Uint152;
var Uint160 = /** @class */ (function (_super) {
    __extends(Uint160, _super);
    function Uint160() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint160._bitlen = 160;
    return Uint160;
}(BaseUint));
exports.Uint160 = Uint160;
var Uint168 = /** @class */ (function (_super) {
    __extends(Uint168, _super);
    function Uint168() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint168._bitlen = 168;
    return Uint168;
}(BaseUint));
exports.Uint168 = Uint168;
var Uint176 = /** @class */ (function (_super) {
    __extends(Uint176, _super);
    function Uint176() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint176._bitlen = 176;
    return Uint176;
}(BaseUint));
exports.Uint176 = Uint176;
var Uint184 = /** @class */ (function (_super) {
    __extends(Uint184, _super);
    function Uint184() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint184._bitlen = 184;
    return Uint184;
}(BaseUint));
exports.Uint184 = Uint184;
var Uint192 = /** @class */ (function (_super) {
    __extends(Uint192, _super);
    function Uint192() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint192._bitlen = 192;
    return Uint192;
}(BaseUint));
exports.Uint192 = Uint192;
var Uint200 = /** @class */ (function (_super) {
    __extends(Uint200, _super);
    function Uint200() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint200._bitlen = 200;
    return Uint200;
}(BaseUint));
exports.Uint200 = Uint200;
var Uint208 = /** @class */ (function (_super) {
    __extends(Uint208, _super);
    function Uint208() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint208._bitlen = 208;
    return Uint208;
}(BaseUint));
exports.Uint208 = Uint208;
var Uint216 = /** @class */ (function (_super) {
    __extends(Uint216, _super);
    function Uint216() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint216._bitlen = 216;
    return Uint216;
}(BaseUint));
exports.Uint216 = Uint216;
var Uint224 = /** @class */ (function (_super) {
    __extends(Uint224, _super);
    function Uint224() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint224._bitlen = 224;
    return Uint224;
}(BaseUint));
exports.Uint224 = Uint224;
var Uint232 = /** @class */ (function (_super) {
    __extends(Uint232, _super);
    function Uint232() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint232._bitlen = 232;
    return Uint232;
}(BaseUint));
exports.Uint232 = Uint232;
var Uint240 = /** @class */ (function (_super) {
    __extends(Uint240, _super);
    function Uint240() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint240._bitlen = 240;
    return Uint240;
}(BaseUint));
exports.Uint240 = Uint240;
var Uint248 = /** @class */ (function (_super) {
    __extends(Uint248, _super);
    function Uint248() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint248._bitlen = 248;
    return Uint248;
}(BaseUint));
exports.Uint248 = Uint248;
var Uint256 = /** @class */ (function (_super) {
    __extends(Uint256, _super);
    function Uint256() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Uint256._bitlen = 256;
    return Uint256;
}(BaseUint));
exports.Uint256 = Uint256;
// alias functions
var uint8 = function (number) { return Uint8._new(number); };
exports.uint8 = uint8;
var uint16 = function (number) { return Uint16._new(number); };
exports.uint16 = uint16;
var uint24 = function (number) { return Uint24._new(number); };
exports.uint24 = uint24;
var uint32 = function (number) { return Uint32._new(number); };
exports.uint32 = uint32;
var uint40 = function (number) { return Uint40._new(number); };
exports.uint40 = uint40;
var uint48 = function (number) { return Uint48._new(number); };
exports.uint48 = uint48;
var uint56 = function (number) { return Uint56._new(number); };
exports.uint56 = uint56;
var uint64 = function (number) { return Uint64._new(number); };
exports.uint64 = uint64;
var uint72 = function (number) { return Uint72._new(number); };
exports.uint72 = uint72;
var uint80 = function (number) { return Uint80._new(number); };
exports.uint80 = uint80;
var uint88 = function (number) { return Uint88._new(number); };
exports.uint88 = uint88;
var uint96 = function (number) { return Uint96._new(number); };
exports.uint96 = uint96;
var uint104 = function (number) { return Uint104._new(number); };
exports.uint104 = uint104;
var uint112 = function (number) { return Uint112._new(number); };
exports.uint112 = uint112;
var uint120 = function (number) { return Uint120._new(number); };
exports.uint120 = uint120;
var uint128 = function (number) { return Uint128._new(number); };
exports.uint128 = uint128;
var uint136 = function (number) { return Uint136._new(number); };
exports.uint136 = uint136;
var uint144 = function (number) { return Uint144._new(number); };
exports.uint144 = uint144;
var uint152 = function (number) { return Uint152._new(number); };
exports.uint152 = uint152;
var uint160 = function (number) { return Uint160._new(number); };
exports.uint160 = uint160;
var uint168 = function (number) { return Uint168._new(number); };
exports.uint168 = uint168;
var uint176 = function (number) { return Uint176._new(number); };
exports.uint176 = uint176;
var uint184 = function (number) { return Uint184._new(number); };
exports.uint184 = uint184;
var uint192 = function (number) { return Uint192._new(number); };
exports.uint192 = uint192;
var uint200 = function (number) { return Uint200._new(number); };
exports.uint200 = uint200;
var uint208 = function (number) { return Uint208._new(number); };
exports.uint208 = uint208;
var uint216 = function (number) { return Uint216._new(number); };
exports.uint216 = uint216;
var uint224 = function (number) { return Uint224._new(number); };
exports.uint224 = uint224;
var uint232 = function (number) { return Uint232._new(number); };
exports.uint232 = uint232;
var uint240 = function (number) { return Uint240._new(number); };
exports.uint240 = uint240;
var uint248 = function (number) { return Uint248._new(number); };
exports.uint248 = uint248;
var uint256 = function (number) { return Uint256._new(number); };
exports.uint256 = uint256;
