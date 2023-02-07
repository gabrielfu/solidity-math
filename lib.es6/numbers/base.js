import BN from "bn.js";
import util from "util";
import { isUnchecked } from "../unchecked";
import * as C from "../constants";
import { Uint256 } from "./uint";
/** @description assert a & b are of the same type */
function _assertSameType(a, b, opname) {
    var atype = a.constructor.name;
    var btype = b.constructor.name;
    if (atype != btype) {
        throw new TypeError("Operator ".concat(opname, " not compatible with types ").concat(atype, " and ").concat(btype, "."));
    }
}
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
/** @description assert b is signed */
function _assertSigned(b, opname) {
    // @ts-ignore
    if (!b.constructor._signed) {
        throw new TypeError("Operator \"".concat(opname, "\" not compatible with unsigned type ").concat(b.constructor.name));
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
 * @description
 * Cast both a and b to the larger type among the two.
 * Returns new instances.
 */
function _castToLargerType(a, b) {
    if (a._bitlen > b._bitlen) {
        return [a.clone(), b.like(a)];
    }
    if (a._bitlen < b._bitlen) {
        return [a.like(b), b.clone()];
    }
    return [a.clone(), b.clone()];
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
    return new BN(number);
}
var BaseNumber = /** @class */ (function () {
    function BaseNumber(number) {
        if (number instanceof BaseNumber) {
            this.bn = number.bn.clone();
        }
        else {
            this.bn = new BN(number);
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
    BaseNumber.prototype[util.inspect.custom] = function () {
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
        if (isUnchecked()) {
            return this._iwraparound();
        }
        else {
            throw new RangeError("Value under/overflow: ".concat(util.inspect(this)));
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
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "iadd");
        _assertLargerType(this, b, "iadd");
        this.bn.iadd(b.bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.add = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "add");
        var r = _castToLargerType(this, b)[0];
        r.bn.iadd(b.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.isub = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "isub");
        _assertLargerType(this, b, "isub");
        this.bn.isub(b.bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.sub = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "sub");
        var r = _castToLargerType(this, b)[0];
        r.bn.isub(b.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.imul = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "imul");
        _assertLargerType(this, b, "imul");
        this.bn.imul(b.bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.mul = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "mul");
        var r = _castToLargerType(this, b)[0];
        r.bn.imul(b.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.idiv = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "idiv");
        _assertLargerType(this, b, "idiv");
        this.bn = this.bn.div(b.bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.div = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "mul");
        var r = _castToLargerType(this, b)[0];
        r.bn = r.bn.div(b.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.imod = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "imod");
        _assertLargerType(this, b, "imod");
        this.bn = this.bn.mod(b.bn);
        return this._checkBounds();
    };
    BaseNumber.prototype.mod = function (b) {
        b = _newNumberIfNeeded(b, this);
        _assertSameSignedNess(this, b, "mod");
        var r = _castToLargerType(this, b)[0];
        r.bn = r.bn.mod(b.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.pow = function (b) {
        b = _newNumberIfNeeded(b, Uint256.min());
        _assertUnsigned(b, "pow");
        var r = this.clone();
        r.bn = r.bn.pow(b.bn);
        return r._checkBounds();
    };
    BaseNumber.prototype.addmod = function (b, m) {
        if (!isUnchecked()) {
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
        if (!isUnchecked()) {
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
        _assertSameSignedNess(this, b, "iand");
        _assertLargerType(this, b, "iand");
        this.bn.iuand(b.bn);
        // and() will take the smallest bit len and don't need to wrap
        return this;
    };
    BaseNumber.prototype.and = function (b) {
        _assertSameSignedNess(this, b, "and");
        var r = this.clone();
        r.bn.iuand(b.bn);
        return r;
    };
    BaseNumber.prototype.ior = function (b) {
        _assertSameSignedNess(this, b, "ior");
        _assertLargerType(this, b, "ior");
        this.bn.iuor(b.bn);
        return this._iwraparound();
    };
    BaseNumber.prototype.or = function (b) {
        _assertSameSignedNess(this, b, "or");
        var r = this.clone();
        r.bn.iuor(b.bn);
        return r._iwraparound();
    };
    BaseNumber.prototype.ixor = function (b) {
        _assertSameSignedNess(this, b, "ixor");
        _assertLargerType(this, b, "ixor");
        this.bn.iuxor(b.bn);
        return this._iwraparound();
    };
    BaseNumber.prototype.xor = function (b) {
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
    /** @description bit length (size) of this type */
    BaseNumber._bitlen = 0;
    return BaseNumber;
}());
export { BaseNumber };
