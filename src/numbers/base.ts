import BN from "bn.js";
import util from "util";
import { getBound, BN2 } from "../constants";
import { isUnchecked } from "../unchecked";

/** @description valid types to construct a new BN from */
export type BNInput = number | string | number[] | Uint8Array | Buffer | BN;
export type Input = BNInput | BaseInteger;

/** 
 * @description returns a new BaseInteger instance for out of place operations, 
 * with the larger bitlen between `a` & `b`.
 */
function _newOutOfPlaceNumber(a: BaseInteger, b: Input): BaseInteger {
    if ((b instanceof BaseInteger) && (b._bitlen > a._bitlen)) {
        return a.like(b);
    }
    return a.clone();
}

/** @description assert `a` & `b` have the same signedness */
function _restrictionSameSignedness(a: BaseInteger, b: Input, opname: string) {
    if (b instanceof BaseInteger) {
        if (a._signed != b._signed) {
            throw new TypeError(
                `Operator "${opname}" not compatible with types ${a.type} and ${b.type}.`
            );
        }
    }
}

/** @description assert `a` has larger bitlen than `b` */
function _restrictionLargerBitlen(a: BaseInteger, b: Input, opname: string) {
    if (b instanceof BaseInteger) {
        if (a._bitlen < b._bitlen) {
            throw new TypeError(`Operator "${opname}" not compatible with ${a.type} and a larger type ${b.type}`);
        }
    }
}

/** @description assert `b` is unsigned */
function _restrictionUnsignedB(b: Input, opname: string) {
    if (b instanceof BaseInteger) {
        if (b._signed) {
            throw new TypeError(`Operator "${opname}" not compatible with signed type ${b.type}`);
        }
    }
    else {
        if ((new BN(b)).isNeg()) {
            throw new TypeError(`Operator "${opname}" not compatible with negative value ${b}`);
        }
    }
}

/** @description assert `b` fits into the range of type `a` */
function _restrictionBNInBounds(a: BaseInteger, b: Input) {
    if (!(b instanceof BaseInteger)) {
        const bn = new BN(b);
        if (bn.lt(a._lbound) || bn.gt(a._ubound)) {
            throw new TypeError(`Right operand ${b} does not fit into type ${a.type}`);
        }
    }
}

/** @description assert unchecked mode is switched on */
function _onlyUnchecked(opname: string) {
    if (!isUnchecked()) {
        throw new TypeError(`Operator ${opname} can only be performed in unchecked mode`);
    }
}

/** @description returns a BN instance */
function _getBN(b: Input): BN {
    return b instanceof BaseInteger ? b.bn : new BN(b);
}

export abstract class BaseInteger {
    /** @description underlying BN */
    bn: BN;
    /** @description bit length (size) of this number */
    readonly _bitlen: number;
    /** @description whether this number is signed or unsigned */
    readonly _signed: boolean;

    constructor(number: Input, bitlen: number, signed: boolean) {
        if (bitlen % 8 != 0 || bitlen > 256 || bitlen < 8) {
            throw new RangeError(`Invalid bit length: ${bitlen}`);
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

    /** @description max representable number of this type */
    get _ubound(): BN {
        return getBound(this._bitlen, this._signed, true);
    }

    /** @description min representable number of this type */
    get _lbound(): BN {
        return getBound(this._bitlen, this._signed, false);
    }

    /** @description create new instance with same bitlen & signedness as `this` */
    _new(number: Input): this {
        return new (
            this.constructor as unknown as new(_number: Input, _bitlen: number, _signed: boolean) => this
        )(number, this._bitlen, this._signed);
    }

    /** @description makes a copy of this number */
    clone(): this {
        return new (<any>this.constructor)(this.bn.clone(), this._bitlen, this._signed);
    }

    /** @description returns type of this instance */
    abstract get type(): string

    /** @description string representation of underlying value */
    toString(base=10): string {
        return this.bn.toString(base);
    }

    /** @description string representation of instance */
    [util.inspect.custom](): string {
        return `${this.type}(${this.bn.toString()})`;
    }

    /** @description performs integer wrap around in-place */
    abstract _iwraparound(): this

    /** 
     * @description Checks if `this` has under/overflowed and takes action.
     * If in unchecked mode, wraps around the lower/upper bound in-place.
     * If not, throws a RangeError.
     */
    _checkBounds(): this {
        if (this.bn.lte(this._ubound) && this.bn.gte(this._lbound)) {
            return this;
        }
        // under / overflow
        if (isUnchecked()) {
            return this._iwraparound();
        } 
        else {
            throw new RangeError(`Value overflow: ${util.inspect(this)}`);
        }
    }

    /** @description cast this to the type `_type` */
    cast<T extends BaseInteger>(_type: (number: Input) => T): T {
        const r = _type(0);
        if (this._signed != r._signed) {
            throw new TypeError(`Cannot cast ${this.type} to ${r.type}.`);
        }
        r.bn = this.bn.clone();
        r._iwraparound();
        return r;
    }

    /** @description cast this to the type of `b` */
    like<T extends BaseInteger>(b: T): T {
        if (this._signed != b._signed) {
            throw new TypeError(`Cannot cast ${this.type} to ${b.type}.`);
        }
        return b._new(this.bn.clone());
    }

    // arithmetic

    iadd(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iadd");
        _restrictionLargerBitlen(this, b, "iadd");
        const bn = _getBN(b);
        this.bn.iadd(bn);
        return this._checkBounds();
    }

    add(b: Input): BaseInteger {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "add");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn.iadd(bn);
        return r._checkBounds();
    }

    isub(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "isub");
        _restrictionLargerBitlen(this, b, "isub");
        const bn = _getBN(b);
        this.bn.isub(bn);
        return this._checkBounds();
    }

    sub(b: Input): BaseInteger {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "sub");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn.isub(bn);
        return r._checkBounds();
    }

    imul(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "imul");
        _restrictionLargerBitlen(this, b, "imul");
        const bn = _getBN(b);
        this.bn.imul(bn);
        return this._checkBounds();
    }

    mul(b: Input): BaseInteger {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mul");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn.imul(bn);
        return r._checkBounds();
    }

    idiv(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "idiv");
        _restrictionLargerBitlen(this, b, "idiv");
        const bn = _getBN(b);
        this.bn = this.bn.div(bn);
        return this._checkBounds();
    }

    div(b: Input): BaseInteger {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "sub");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn = r.bn.div(bn);
        return r._checkBounds();
    }

    imod(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "imod");
        _restrictionLargerBitlen(this, b, "imod");
        const bn = _getBN(b);
        this.bn = this.bn.mod(bn);
        return this._checkBounds();
    }

    mod(b: Input): BaseInteger {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mod");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn = r.bn.mod(bn);
        return r._checkBounds();
    }

    pow(b: Input): BaseInteger {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "pow");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn = r.bn.pow(bn);
        return r._checkBounds();
    }

    addmod(b: Input, m: Input): this {
        _onlyUnchecked("addmod");
        _restrictionBNInBounds(this, b);
        _restrictionBNInBounds(this, m);
        _restrictionSameSignedness(this, b, "addmod");
        _restrictionSameSignedness(this, m, "addmod");
        const bbn = _getBN(b);
        const mbn = _getBN(m);
        const r = this.clone();
        r.bn = r.bn.add(bbn).mod(mbn);
        return r._checkBounds();
    }

    mulmod(b: Input, m: Input): this {
        _onlyUnchecked("mulmod");
        _restrictionBNInBounds(this, b);
        _restrictionBNInBounds(this, m);
        _restrictionSameSignedness(this, b, "mulmod");
        _restrictionSameSignedness(this, m, "mulmod");
        const bbn = _getBN(b);
        const mbn = _getBN(m);
        const r = this.clone();
        r.bn = r.bn.mul(bbn).mod(mbn);
        return r._checkBounds();
    }

    // shift
    // never overflow
    /** 
     * For positive and negative x values, x << y is equivalent to x * 2**y.
     * For positive x values, x >> y is equivalent to x / 2**y.
     * For negative x values, x >> y is equivalent to (x + 1) / 2**y - 1 
     *  (which is the same as dividing x by 2**y while rounding down towards negative infinity).
     */

    ishln(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "ishln");
        const bn = _getBN(b);
        this.bn.iushln(bn.toNumber());
        return this._iwraparound();
    }

    shln(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shln");
        const bn = _getBN(b);
        const r = this.clone();
        r.bn.iushln(bn.toNumber());
        return r._iwraparound();
    }

    ishrn(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "ishrn");
        const bn = _getBN(b);
        if (this.bn.isNeg()) {
            this.bn = this.bn.addn(1).div(BN2.pow(bn)).subn(1);
        }
        else {
            this.bn.iushrn(bn.toNumber());
        }
        return this._iwraparound();
    }

    shrn(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shrn");
        const bn = _getBN(b);
        const r = this.clone();
        if (r.bn.isNeg()) {
            r.bn = this.bn.addn(1).div(BN2.pow(bn)).subn(1);
        }
        else {
            r.bn.iushrn(bn.toNumber());
        }
        return r._iwraparound();
    }

    // bit

    iand(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iand");
        _restrictionLargerBitlen(this, b, "iand");
        const bn = _getBN(b);
        this.bn = this.bn.toTwos(this._bitlen).uand(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        // and() will take the smallest bit len and don't need to wrap
        return this;
    }

    and(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "and");
        const r = this.clone();
        const bn = _getBN(b);
        r.bn = r.bn.toTwos(this._bitlen).uand(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return r;
    }

    ior(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ior");
        _restrictionLargerBitlen(this, b, "ior");
        const bn = _getBN(b);
        this.bn = this.bn.toTwos(this._bitlen).uor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return this._iwraparound();
    }

    or(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "or");
        const r = this.clone();
        const bn = _getBN(b);
        r.bn = r.bn.toTwos(this._bitlen).uor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return r._iwraparound();
    }

    ixor(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ixor");
        _restrictionLargerBitlen(this, b, "ixor");
        const bn = _getBN(b);
        this.bn = this.bn.toTwos(this._bitlen).uxor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return this._iwraparound();
    }

    xor(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "xor");
        const r = this.clone();
        const bn = _getBN(b);
        r.bn = r.bn.toTwos(this._bitlen).uxor(bn.toTwos(this._bitlen)).fromTwos(this._bitlen);
        return r._iwraparound();
    }

    inot(): this {
        this.bn.inotn(this._bitlen);
        return this;
    }

    not(): this {
        return this.clone().inot();
    }

    // comparison

    gt(b: Input): boolean {
        _restrictionSameSignedness(this, b, "gt");
        const bn = _getBN(b);
        return this.bn.gt(bn);
    }

    lt(b: Input): boolean {
        _restrictionSameSignedness(this, b, "lt");
        const bn = _getBN(b);
        return this.bn.lt(bn);
    }

    gte(b: Input): boolean {
        _restrictionSameSignedness(this, b, "gte");
        const bn = _getBN(b);
        return this.bn.gte(bn);
    }

    lte(b: Input): boolean {
        _restrictionSameSignedness(this, b, "lte");
        const bn = _getBN(b);
        return this.bn.lte(bn);
    }

    eq(b: Input): boolean {
        _restrictionSameSignedness(this, b, "eq");
        const bn = _getBN(b);
        return this.bn.eq(bn);
    }

    neq(b: Input): boolean {
        _restrictionSameSignedness(this, b, "neq");
        const bn = _getBN(b);
        return !this.bn.eq(bn);
    }
    // comparison as value

    gt_(b: Input): this {
        return this._new(+(this.gt(b)));
    }

    lt_(b: Input): this {
        return this._new(+(this.lt(b)));
    }

    gte_(b: Input): this {
        return this._new(+(this.gte(b)));
    }

    lte_(b: Input): this {
        return this._new(+(this.lte(b)));
    }

    eq_(b: Input): this {
        return this._new(+(this.eq(b)));
    }

    neq_(b: Input): this {
        return this._new(+(this.neq(b)));
    }
}
