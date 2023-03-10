import BN from "bn.js";
import util from "util";
import { getBound, BN2 } from "../constants";
import { isUnchecked } from "../unchecked";
/**
 * @description returns a new BaseInteger instance for out of place operations,
 * with the larger bitlen between `a` & `b`.
 */
function _newOutOfPlaceNumber(a, b) {
    if ((b instanceof BaseInteger) && (b._bitlen > a._bitlen)) {
        return a.like(b);
    }
    return a.clone();
}
/** @description assert `a` & `b` have the same signedness */
function _restrictionSameSignedness(a, b, opname) {
    if (b instanceof BaseInteger) {
        if (a._signed != b._signed) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with types ").concat(a.type, " and ").concat(b.type, "."));
        }
    }
}
/** @description assert `a` has larger bitlen than `b` */
function _restrictionLargerBitlen(a, b, opname) {
    if (b instanceof BaseInteger) {
        if (a._bitlen < b._bitlen) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with ").concat(a.type, " and a larger type ").concat(b.type));
        }
    }
}
/** @description assert `b` is unsigned */
function _restrictionUnsignedB(b, opname) {
    if (b instanceof BaseInteger) {
        if (b._signed) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with signed type ").concat(b.type));
        }
    }
    else {
        if ((new BN(b)).isNeg()) {
            throw new TypeError("Operator \"".concat(opname, "\" not compatible with negative value ").concat(b));
        }
    }
}
/** @description assert `b` fits into the range of type `a` */
function _restrictionBNInBounds(a, b) {
    if (!(b instanceof BaseInteger)) {
        var bn = new BN(b);
        if (bn.lt(a._lbound) || bn.gt(a._ubound)) {
            throw new TypeError("Right operand ".concat(b, " does not fit into type ").concat(a.type));
        }
    }
}
/** @description assert unchecked mode is switched on */
function _onlyUnchecked(opname) {
    if (!isUnchecked()) {
        throw new TypeError("Operator ".concat(opname, " can only be performed in unchecked mode"));
    }
}
/** @description returns a BN instance */
function _getBN(b) {
    return b instanceof BaseInteger ? b.bn : new BN(b);
}
var BaseInteger = /** @class */ (function () {
    function BaseInteger(number, bitlen, signed) {
        if (bitlen % 8 != 0 || bitlen > 256 || bitlen < 8) {
            throw new RangeError("Invalid bit length: ".concat(bitlen));
        }
        if (number instanceof BaseInteger) {
            this.bn = number.bn.clone();
        }
        else {
            this.bn = new BN(number);
        }
        this._bitlen = bitlen;
        this._signed = signed;
        this._checkBounds();
    }
    Object.defineProperty(BaseInteger.prototype, "_ubound", {
        /** @description max representable number of this type */
        get: function () {
            return getBound(this._bitlen, this._signed, true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseInteger.prototype, "_lbound", {
        /** @description min representable number of this type */
        get: function () {
            return getBound(this._bitlen, this._signed, false);
        },
        enumerable: false,
        configurable: true
    });
    /** @description create new instance with same bitlen & signedness as `this` */
    BaseInteger.prototype._new = function (number) {
        return new this.constructor(number, this._bitlen, this._signed);
    };
    /** @description makes a copy of this number */
    BaseInteger.prototype.clone = function () {
        return new this.constructor(this.bn.clone(), this._bitlen, this._signed);
    };
    /** @description string representation of underlying value */
    BaseInteger.prototype.toString = function (base) {
        if (base === void 0) { base = 10; }
        return this.bn.toString(base);
    };
    /** @description string representation of instance */
    BaseInteger.prototype[util.inspect.custom] = function () {
        return "".concat(this.type, "(").concat(this.bn.toString(), ")");
    };
    /**
     * @description Checks if `this` has under/overflowed and takes action.
     * If in unchecked mode, wraps around the lower/upper bound in-place.
     * If not, throws a RangeError.
     */
    BaseInteger.prototype._checkBounds = function () {
        if (this.bn.lte(this._ubound) && this.bn.gte(this._lbound)) {
            return this;
        }
        // under / overflow
        if (isUnchecked()) {
            return this._iwraparound();
        }
        else {
            throw new RangeError("Value overflow: ".concat(util.inspect(this)));
        }
    };
    /** @description cast this to the type `_type` */
    BaseInteger.prototype.cast = function (_type) {
        var r = _type(0);
        if (this._signed != r._signed) {
            throw new TypeError("Cannot cast ".concat(this.type, " to ").concat(r.type, "."));
        }
        r.bn = this.bn.clone();
        r._iwraparound();
        return r;
    };
    /** @description cast this to the type of `b` */
    BaseInteger.prototype.like = function (b) {
        if (this._signed != b._signed) {
            throw new TypeError("Cannot cast ".concat(this.type, " to ").concat(b.type, "."));
        }
        return b._new(this.bn.clone());
    };
    // arithmetic
    BaseInteger.prototype.iadd = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iadd");
        _restrictionLargerBitlen(this, b, "iadd");
        var bn = _getBN(b);
        this.bn.iadd(bn);
        return this._checkBounds();
    };
    BaseInteger.prototype.add = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "add");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn.iadd(bn);
        return r._checkBounds();
    };
    BaseInteger.prototype.isub = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "isub");
        _restrictionLargerBitlen(this, b, "isub");
        var bn = _getBN(b);
        this.bn.isub(bn);
        return this._checkBounds();
    };
    BaseInteger.prototype.sub = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "sub");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn.isub(bn);
        return r._checkBounds();
    };
    BaseInteger.prototype.imul = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "imul");
        _restrictionLargerBitlen(this, b, "imul");
        var bn = _getBN(b);
        this.bn.imul(bn);
        return this._checkBounds();
    };
    BaseInteger.prototype.mul = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mul");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn.imul(bn);
        return r._checkBounds();
    };
    BaseInteger.prototype.idiv = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "idiv");
        _restrictionLargerBitlen(this, b, "idiv");
        var bn = _getBN(b);
        this.bn = this.bn.div(bn);
        return this._checkBounds();
    };
    BaseInteger.prototype.div = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "sub");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn = r.bn.div(bn);
        return r._checkBounds();
    };
    BaseInteger.prototype.imod = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "imod");
        _restrictionLargerBitlen(this, b, "imod");
        var bn = _getBN(b);
        this.bn = this.bn.mod(bn);
        return this._checkBounds();
    };
    BaseInteger.prototype.mod = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mod");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn = r.bn.mod(bn);
        return r._checkBounds();
    };
    BaseInteger.prototype.pow = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "pow");
        var r = _newOutOfPlaceNumber(this, b);
        var bn = _getBN(b);
        r.bn = r.bn.pow(bn);
        return r._checkBounds();
    };
    BaseInteger.prototype.addmod = function (b, m) {
        _onlyUnchecked("addmod");
        _restrictionBNInBounds(this, b);
        _restrictionBNInBounds(this, m);
        _restrictionSameSignedness(this, b, "addmod");
        _restrictionSameSignedness(this, m, "addmod");
        var bbn = _getBN(b);
        var mbn = _getBN(m);
        var r = this.clone();
        r.bn = r.bn.add(bbn).mod(mbn);
        return r._checkBounds();
    };
    BaseInteger.prototype.mulmod = function (b, m) {
        _onlyUnchecked("mulmod");
        _restrictionBNInBounds(this, b);
        _restrictionBNInBounds(this, m);
        _restrictionSameSignedness(this, b, "mulmod");
        _restrictionSameSignedness(this, m, "mulmod");
        var bbn = _getBN(b);
        var mbn = _getBN(m);
        var r = this.clone();
        r.bn = r.bn.mul(bbn).mod(mbn);
        return r._checkBounds();
    };
    // shift
    // never overflow
    /**
     * For positive and negative x values, x << y is equivalent to x * 2**y.
     * For positive x values, x >> y is equivalent to x / 2**y.
     * For negative x values, x >> y is equivalent to (x + 1) / 2**y - 1
     *  (which is the same as dividing x by 2**y while rounding down towards negative infinity).
     */
    BaseInteger.prototype.ishln = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "ishln");
        var bn = _getBN(b);
        this.bn.iushln(bn.toNumber());
        return this._iwraparound();
    };
    BaseInteger.prototype.shln = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shln");
        var bn = _getBN(b);
        var r = this.clone();
        r.bn.iushln(bn.toNumber());
        return r._iwraparound();
    };
    BaseInteger.prototype.ishrn = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "ishrn");
        var bn = _getBN(b);
        if (this.bn.isNeg()) {
            this.bn = this.bn.addn(1).div(BN2.pow(bn)).subn(1);
        }
        else {
            this.bn.iushrn(bn.toNumber());
        }
        return this._iwraparound();
    };
    BaseInteger.prototype.shrn = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shrn");
        var bn = _getBN(b);
        var r = this.clone();
        if (r.bn.isNeg()) {
            r.bn = this.bn.addn(1).div(BN2.pow(bn)).subn(1);
        }
        else {
            r.bn.iushrn(bn.toNumber());
        }
        return r._iwraparound();
    };
    // bit
    BaseInteger.prototype.iand = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iand");
        _restrictionLargerBitlen(this, b, "iand");
        var bn = _getBN(b);
        this.bn = this.bn.toTwos(this._bitlen).uand(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        // and() will take the smallest bit len and don't need to wrap
        return this;
    };
    BaseInteger.prototype.and = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "and");
        var r = this.clone();
        var bn = _getBN(b);
        r.bn = r.bn.toTwos(this._bitlen).uand(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return r;
    };
    BaseInteger.prototype.ior = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ior");
        _restrictionLargerBitlen(this, b, "ior");
        var bn = _getBN(b);
        this.bn = this.bn.toTwos(this._bitlen).uor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return this._iwraparound();
    };
    BaseInteger.prototype.or = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "or");
        var r = this.clone();
        var bn = _getBN(b);
        r.bn = r.bn.toTwos(this._bitlen).uor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return r._iwraparound();
    };
    BaseInteger.prototype.ixor = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ixor");
        _restrictionLargerBitlen(this, b, "ixor");
        var bn = _getBN(b);
        this.bn = this.bn.toTwos(this._bitlen).uxor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return this._iwraparound();
    };
    BaseInteger.prototype.xor = function (b) {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "xor");
        var r = this.clone();
        var bn = _getBN(b);
        r.bn = r.bn.toTwos(this._bitlen).uxor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return r._iwraparound();
    };
    BaseInteger.prototype.inot = function () {
        this.bn.inotn(this._bitlen);
        return this;
    };
    BaseInteger.prototype.not = function () {
        return this.clone().inot();
    };
    // comparison
    BaseInteger.prototype.gt = function (b) {
        _restrictionSameSignedness(this, b, "gt");
        var bn = _getBN(b);
        return this.bn.gt(bn);
    };
    BaseInteger.prototype.lt = function (b) {
        _restrictionSameSignedness(this, b, "lt");
        var bn = _getBN(b);
        return this.bn.lt(bn);
    };
    BaseInteger.prototype.gte = function (b) {
        _restrictionSameSignedness(this, b, "gte");
        var bn = _getBN(b);
        return this.bn.gte(bn);
    };
    BaseInteger.prototype.lte = function (b) {
        _restrictionSameSignedness(this, b, "lte");
        var bn = _getBN(b);
        return this.bn.lte(bn);
    };
    BaseInteger.prototype.eq = function (b) {
        _restrictionSameSignedness(this, b, "eq");
        var bn = _getBN(b);
        return this.bn.eq(bn);
    };
    BaseInteger.prototype.neq = function (b) {
        _restrictionSameSignedness(this, b, "neq");
        var bn = _getBN(b);
        return !this.bn.eq(bn);
    };
    // comparison as value
    BaseInteger.prototype.gt_ = function (b) {
        return this._new(+(this.gt(b)));
    };
    BaseInteger.prototype.lt_ = function (b) {
        return this._new(+(this.lt(b)));
    };
    BaseInteger.prototype.gte_ = function (b) {
        return this._new(+(this.gte(b)));
    };
    BaseInteger.prototype.lte_ = function (b) {
        return this._new(+(this.lte(b)));
    };
    BaseInteger.prototype.eq_ = function (b) {
        return this._new(+(this.eq(b)));
    };
    BaseInteger.prototype.neq_ = function (b) {
        return this._new(+(this.neq(b)));
    };
    return BaseInteger;
}());
export { BaseInteger };
