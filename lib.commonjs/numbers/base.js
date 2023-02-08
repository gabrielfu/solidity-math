"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNumber = void 0;
var bn_js_1 = __importDefault(require("bn.js"));
var util_1 = __importDefault(require("util"));
var unchecked_1 = require("../unchecked");
/**
 * @description returns a new BaseNumber instance for out of place operations,
 * with the larger bitlen between `a` & `b`.
 */
function _newOutOfPlaceNumber(a, b) {
    if ((b instanceof BaseNumber) && (b._bitlen > a._bitlen)) {
        return a.like(b);
    }
    return a.clone();
}
/** @description assert `a` & `b` have the same signedness */
function _restrictionSameSignedness(a, b, opname) {
    if (b instanceof BaseNumber) {
        if (a._signed != b._signed) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with types ").concat(a.constructor.name, " and ").concat(b.constructor.name, "."));
        }
    }
}
/** @description assert `a` has larger bitlen than `b` */
function _restrictionLargerBitlen(a, b, opname) {
    if (b instanceof BaseNumber) {
        if (a._bitlen < b._bitlen) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with ").concat(a.constructor.name, " and a larger type ").concat(b.constructor.name));
        }
    }
}
/** @description assert `b` is unsigned */
function _restrictionUnsignedB(b, opname) {
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
/** @description assert `b` fits into the range of type `a` */
function _restrictionBNInBounds(a, b) {
    if (!(b instanceof BaseNumber)) {
        var bn = new bn_js_1.default(b);
        if (bn.lt(a._lbound) || bn.gt(a._ubound)) {
            throw new TypeError("Right operand ".concat(b, " does not fit into type ").concat(a.constructor.name));
        }
    }
}
function _onlyUnchecked(opname) {
    if (!(0, unchecked_1.isUnchecked)()) {
        throw new TypeError("Operator ".concat(opname, " can only be performed in unchecked mode"));
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
        if (this._signed != btype._signed) {
            throw new TypeError("Cannot cast ".concat(this.constructor.name, " to ").concat(btype.name, "."));
        }
        return btype._new(this.bn);
    };
    /** @description cast to another BaseNumber subclass type */
    BaseNumber.prototype.like = function (b) {
        if (this._signed != b._signed) {
            throw new TypeError("Cannot cast ".concat(this.constructor.name, " to ").concat(b.constructor.name, "."));
        }
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
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "pow");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn = r.bn.pow(bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.addmod = function (b, m) {
        _onlyUnchecked("addmod");
        _restrictionBNInBounds(this, b);
        _restrictionBNInBounds(this, m);
        _restrictionSameSignedness(this, b, "addmod");
        _restrictionSameSignedness(this, m, "addmod");
        var bbn = _getBN(b);
        var mbn = _getBN(b);
        var r = this.clone();
        r.bn = r.bn.add(bbn).mod(mbn);
        return r._checkBounds();
    };
    BaseNumber.prototype.mulmod = function (b, m) {
        _onlyUnchecked("mulmod");
        _restrictionBNInBounds(this, b);
        _restrictionBNInBounds(this, m);
        _restrictionSameSignedness(this, b, "mulmod");
        _restrictionSameSignedness(this, m, "mulmod");
        var bbn = _getBN(b);
        var mbn = _getBN(b);
        var r = this.clone();
        r.bn = r.bn.mul(bbn).mod(mbn);
        return r._checkBounds();
    };
    // shift
    // never overflow
    BaseNumber.prototype.ishln = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "ishln");
        var bn = _getBN(b);
        this.bn.iushln(bn.toNumber());
        return this._iwraparound();
    };
    BaseNumber.prototype.shln = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shln");
        var bn = _getBN(b);
        var r = this.clone();
        r.bn.iushln(bn.toNumber());
        return r._iwraparound();
    };
    BaseNumber.prototype.ishrn = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "ishrn");
        var bn = _getBN(b);
        this.bn.iushrn(bn.toNumber());
        return this._iwraparound();
    };
    BaseNumber.prototype.shrn = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shrn");
        var bn = _getBN(b);
        var r = this.clone();
        r.bn.iushrn(bn.toNumber());
        return r._iwraparound();
    };
    // bit
    BaseNumber.prototype.iand = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iand");
        _restrictionLargerBitlen(this, b, "iand");
        var bn = _getBN(b);
        this.bn.iuand(bn);
        // and() will take the smallest bit len and don't need to wrap
        return this;
    };
    BaseNumber.prototype.and = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "and");
        var r = this.clone();
        var bn = _getBN(b);
        r.bn.iuand(bn);
        return r;
    };
    BaseNumber.prototype.ior = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ior");
        _restrictionLargerBitlen(this, b, "ior");
        var bn = _getBN(b);
        this.bn.iuor(bn);
        return this._iwraparound();
    };
    BaseNumber.prototype.or = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "or");
        var r = this.clone();
        var bn = _getBN(b);
        r.bn.iuor(bn);
        return r._iwraparound();
    };
    BaseNumber.prototype.ixor = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ixor");
        _restrictionLargerBitlen(this, b, "ixor");
        var bn = _getBN(b);
        this.bn.iuxor(bn);
        return this._iwraparound();
    };
    BaseNumber.prototype.xor = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "xor");
        var r = this.clone();
        var bn = _getBN(b);
        r.bn.iuxor(bn);
        return r._iwraparound();
    };
    BaseNumber.prototype.inot = function () {
        this.bn.inotn(this._bitlen);
        return this;
    };
    BaseNumber.prototype.not = function () {
        return this.clone().inot();
    };
    // comparison
    BaseNumber.prototype.gt = function (b) {
        _restrictionSameSignedness(this, b, "gt");
        var bn = _getBN(b);
        return this.bn.gt(bn);
    };
    BaseNumber.prototype.lt = function (b) {
        _restrictionSameSignedness(this, b, "lt");
        var bn = _getBN(b);
        return this.bn.lt(bn);
    };
    BaseNumber.prototype.gte = function (b) {
        _restrictionSameSignedness(this, b, "gte");
        var bn = _getBN(b);
        return this.bn.gte(bn);
    };
    BaseNumber.prototype.lte = function (b) {
        _restrictionSameSignedness(this, b, "lte");
        var bn = _getBN(b);
        return this.bn.lte(bn);
    };
    BaseNumber.prototype.eq = function (b) {
        _restrictionSameSignedness(this, b, "eq");
        var bn = _getBN(b);
        return this.bn.eq(bn);
    };
    BaseNumber.prototype.neq = function (b) {
        _restrictionSameSignedness(this, b, "neq");
        var bn = _getBN(b);
        return !this.bn.eq(bn);
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
