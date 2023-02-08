"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNumber = void 0;
var bn_js_1 = __importDefault(require("bn.js"));
var util_1 = __importDefault(require("util"));
var unchecked_1 = require("../unchecked");
var C = __importStar(require("../constants"));
var factory_1 = require("./factory");
/** @description assert a & b are of the same signedness */
function _assertSameSignedNess(a, b, opname) {
    // @ts-ignore
    if (a.constructor._signed != b.constructor._signed) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with types ").concat(a.constructor.name, " and ").concat(b.constructor.name, "."));
    }
}
/** @description assert a & b are of the same signedness */
function _assertSameSignedNessType(a, btype, opname) {
    // @ts-ignore
    if (a.constructor._signed != btype._signed) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with types ").concat(a.constructor.name, " and ").concat(btype.name, "."));
    }
}
/** @description assert b is unsigned */
function _assertUnsigned(b, opname) {
    // @ts-ignore
    if (b.constructor._signed) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with signed type ").concat(b.constructor.name));
    }
}
/** @description assert b >= 0 */
function _assertNonNegative(b, opname) {
    if (b < 0) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with negative value ").concat(b));
    }
}
/** @description assert b >= 0 */
function _assertBNNonNegative(b, opname) {
    if (b.lt(C.BN0)) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with negative value ").concat(b));
    }
}
/** @description assert a has larger bitlen */
function _assertLargerType(a, b, opname) {
    if (a._bitlen < b._bitlen) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with ").concat(a.constructor.name, " and a larger type ").concat(b.constructor.name));
    }
}
/**
 * @description returns a new BaseNumber instance for out of place operations,
 * with the larger bitlen between `a` & `b`.
 */
function _newOutOfPlaceNumber(a, b) {
    var bitlen = b instanceof BaseNumber ? Math.max(a._bitlen, b._bitlen) : a._bitlen;
    var cls = (0, factory_1.classFactory)(bitlen * (a._signed ? -1 : 1));
    return new cls(a.bn);
}
/** @description creates new BaseNumber instance if needed */
function _newNumberIfNeeded(number, fallbackClass) {
    if (number instanceof BaseNumber) {
        return number;
    }
    // @ts-ignore
    return fallbackClass.constructor._new(number);
}
/** @description creates new BN instance if needed */
function _newBNIfNeeded(number) {
    if (number instanceof BaseNumber) {
        return number.bn;
    }
    return new bn_js_1.default(number);
}
function _restrictionSameSignedness(a, b, opname) {
    if (b instanceof BaseNumber) {
        if (a._signed != b._signed) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with types ").concat(a.constructor.name, " and ").concat(b.constructor.name, "."));
        }
    }
}
function _restrictionLargerBitlen(a, b, opname) {
    if (b instanceof BaseNumber) {
        if (a._bitlen < b._bitlen) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with ").concat(a.constructor.name, " and a larger type ").concat(b.constructor.name));
        }
    }
}
function _restrictionUnsignedB(a, b, opname) {
    if (b instanceof BaseNumber) {
        if (b._signed) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with signed type ").concat(b.constructor.name));
        }
    }
    else {
        if ((new bn_js_1.default(b)).isNeg()) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with negative value ").concat(b));
        }
    }
}
function _restrictionBNInBounds(a, b) {
    if (!(b instanceof BaseNumber)) {
        var bn = new bn_js_1.default(b);
        if (bn.lt(a._lbound) || bn.gt(a._ubound)) {
            throw new TypeError("Right operand ".concat(b, " does not fit into type ").concat(a.constructor.name));
        }
    }
}
/** @description returns a BN instance */
function _getBN(b) {
    return b instanceof BaseNumber ? b.bn : new bn_js_1.default(b);
}
var BaseNumber = /** @class */ (function () {
    function BaseNumber(number) {
        if (number instanceof BaseNumber) {
            this.bn = number.bn.clone();
        }
        else {
            this.bn = new bn_js_1.default(number);
        }
        this._checkBounds();
    }
    Object.defineProperty(BaseNumber.prototype, "_bitlen", {
        /** @description bit length (size) of this type */
        get: function () {
            // @ts-ignore
            return this.constructor._bitlen;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseNumber.prototype, "_ubound", {
        /** @description max representable number of this type */
        get: function () {
            // @ts-ignore
            return this.constructor._ubound;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseNumber.prototype, "_lbound", {
        /** @description min representable number of this type */
        get: function () {
            // @ts-ignore
            return this.constructor._lbound;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseNumber.prototype, "_signed", {
        /** @description bit length (size) of this type */
        get: function () {
            // @ts-ignore
            return this.constructor._signed;
        },
        enumerable: false,
        configurable: true
    });
    /** @description constructor as static function supporting subclasses */
    BaseNumber._new = function (number) {
        return new this(number);
    };
    /** @description max representable number of this type */
    BaseNumber.max = function () {
        return this._new(this._ubound);
    };
    /** @description min representable number of this type */
    BaseNumber.min = function () {
        return this._new(this._lbound);
    };
    /** @description makes a copy of this number */
    BaseNumber.prototype.clone = function () {
        // @ts-ignore call static function
        return this.constructor._new(this.bn.clone());
    };
    /** @description string representation of underlying value */
    BaseNumber.prototype.toString = function (base) {
        if (base === void 0) { base = 10; }
        return this.bn.toString(base);
    };
    /** @description string representation of instance */
    BaseNumber.prototype[util_1.default.inspect.custom] = function () {
        return "".concat(this.constructor.name, "(").concat(this.bn.toString(), ")");
    };
    /**
     * @description Checks if `this` has under/overflowed and takes action.
     * If in unchecked mode, wraps around the lower/upper bound in-place.
     * If not, throws a RangeError.
     */
    BaseNumber.prototype._checkBounds = function () {
        if (this.bn.lte(this._ubound) && this.bn.gte(this._lbound)) {
            return this;
        }
        // under / overflow
        if ((0, unchecked_1.isUnchecked)()) {
            return this._iwraparound();
        }
        else {
            throw new RangeError("Value overflow: ".concat(util_1.default.inspect(this)));
        }
    };
    /** @description cast to another BaseNumber subclass type */
    BaseNumber.prototype.as = function (btype) {
        _assertSameSignedNessType(this, btype, "as");
        return btype._new(this.bn);
    };
    /** @description cast to another BaseNumber subclass type */
    BaseNumber.prototype.like = function (b) {
        _assertSameSignedNess(this, b, "like");
        // @ts-ignore
        return b.constructor._new(this.bn);
    };
    // arithmetic
    BaseNumber.prototype.iadd = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iadd");
        _restrictionLargerBitlen(this, b, "iadd");
        var bn = _getBN(b);
        this.bn.iadd(bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.add = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "add");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn.iadd(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.isub = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "isub");
        _restrictionLargerBitlen(this, b, "isub");
        var bn = _getBN(b);
        this.bn.isub(bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.sub = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "sub");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn.isub(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.imul = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "imul");
        _restrictionLargerBitlen(this, b, "imul");
        var bn = _getBN(b);
        this.bn.imul(bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.mul = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mul");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn.imul(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.idiv = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "idiv");
        _restrictionLargerBitlen(this, b, "idiv");
        var bn = _getBN(b);
        this.bn = this.bn.div(bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.div = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "sub");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn = r.bn.div(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.imod = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "imod");
        _restrictionLargerBitlen(this, b, "imod");
        var bn = _getBN(b);
        this.bn = this.bn.mod(bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.mod = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mod");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn = r.bn.mod(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.pow = function (b) {
        var bn;
        if (b instanceof BaseNumber) {
            _assertUnsigned(b, "pow");
            bn = b.bn;
        }
        else {
            bn = new bn_js_1.default(b);
            _assertBNNonNegative(bn, "pow");
        }
        var r = this.clone();
        r.bn = r.bn.pow(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.addmod = function (b, m) {
        if (!(0, unchecked_1.isUnchecked)()) {
            throw new Error("addmod can only be performed in unchecked mode");
        }
        b = _newNumberIfNeeded(b, this);
        m = _newNumberIfNeeded(m, this);
        _assertSameSignedNess(this, b, "addmod");
        _assertSameSignedNess(this, m, "addmod");
        var r = this.clone();
        r.bn = r.bn.add(b.bn).mod(m.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.mulmod = function (b, m) {
        if (!(0, unchecked_1.isUnchecked)()) {
            throw new Error("mulmod can only be performed in unchecked mode");
        }
        b = _newNumberIfNeeded(b, this);
        m = _newNumberIfNeeded(m, this);
        _assertSameSignedNess(this, b, "mulmod");
        _assertSameSignedNess(this, m, "mulmod");
        var r = this.clone();
        r.bn = r.bn.mul(b.bn).mod(m.bn);
        return r._checkBounds();
    };
    // shift
    // never under / overflows
    BaseNumber.prototype.ishln = function (b) {
        if (typeof b != "number") {
            _assertUnsigned(b, "shln");
            b = b.bn.toNumber();
        }
        _assertNonNegative(b, "shln");
        this.bn.iushln(b);
        return this._iwraparound();
    };
    BaseNumber.prototype.shln = function (b) {
        var r = this.clone();
        r.ishln(b);
        return r._iwraparound();
    };
    BaseNumber.prototype.ishrn = function (b) {
        if (typeof b != "number") {
            _assertUnsigned(b, "shrn");
            b = b.bn.toNumber();
        }
        _assertNonNegative(b, "shrn");
        this.bn.iushrn(b);
        return this._iwraparound();
    };
    BaseNumber.prototype.shrn = function (b) {
        var r = this.clone();
        r.ishrn(b);
        return r._iwraparound();
    };
    // bit
    BaseNumber.prototype.iand = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "iand");
        _assertLargerType(this, b, "iand");
        this.bn.iuand(b.bn);
        // and() will take the smallest bit len and don't need to wrap
        return this;
    };
    BaseNumber.prototype.and = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "and");
        var r = this.clone();
        r.bn.iuand(b.bn);
        return r;
    };
    BaseNumber.prototype.ior = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "ior");
        _assertLargerType(this, b, "ior");
        this.bn.iuor(b.bn);
        return this._iwraparound();
    };
    BaseNumber.prototype.or = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "or");
        var r = this.clone();
        r.bn.iuor(b.bn);
        return r._iwraparound();
    };
    BaseNumber.prototype.ixor = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "ixor");
        _assertLargerType(this, b, "ixor");
        this.bn.iuxor(b.bn);
        return this._iwraparound();
    };
    BaseNumber.prototype.xor = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "xor");
        var r = this.clone();
        r.bn.iuxor(b.bn);
        return r._iwraparound();
    };
    BaseNumber.prototype.inot = function () {
        // @ts-ignore
        this.bn.inotn(this.constructor._bitlen);
        return this;
    };
    BaseNumber.prototype.not = function () {
        return this.clone().inot();
    };
    // comparison
    BaseNumber.prototype.gt = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "gt");
        return this.bn.gt(b.bn);
    };
    BaseNumber.prototype.lt = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "lt");
        return this.bn.lt(b.bn);
    };
    BaseNumber.prototype.gte = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "gte");
        return this.bn.gte(b.bn);
    };
    BaseNumber.prototype.lte = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "lte");
        return this.bn.lte(b.bn);
    };
    BaseNumber.prototype.eq = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "eq");
        return this.bn.eq(b.bn);
    };
    BaseNumber.prototype.neq = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "neq");
        return !this.bn.eq(b.bn);
    };
    // comparison as value
    BaseNumber.prototype.gt_ = function (b) {
        // @ts-ignore
        return this.constructor._new(+(this.gt(b)));
    };
    BaseNumber.prototype.lt_ = function (b) {
        // @ts-ignore
        return this.constructor._new(+(this.lt(b)));
    };
    BaseNumber.prototype.gte_ = function (b) {
        // @ts-ignore
        return this.constructor._new(+(this.gte(b)));
    };
    BaseNumber.prototype.lte_ = function (b) {
        // @ts-ignore
        return this.constructor._new(+(this.lte(b)));
    };
    BaseNumber.prototype.eq_ = function (b) {
        // @ts-ignore
        return this.constructor._new(+(this.eq(b)));
    };
    BaseNumber.prototype.neq_ = function (b) {
        // @ts-ignore
        return this.constructor._new(+(this.neq(b)));
    };
    /** @description bit length (size) of this type */
    BaseNumber._bitlen = 0;
    return BaseNumber;
}());
exports.BaseNumber = BaseNumber;
