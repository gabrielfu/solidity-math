import BN from "bn.js";
import util from "util";
import { isUnchecked } from "../unchecked";

/** @description valid types to construct a new BN from */
export type BNInput = number | string | number[] | Uint8Array | Buffer | BN;
export type Input = BNInput | BaseNumber;

/** 
 * @description returns a new BaseNumber instance for out of place operations, 
 * with the larger bitlen between `a` & `b`.
 */
function _newOutOfPlaceNumber(a: BaseNumber, b: Input): BaseNumber {
    if ((b instanceof BaseNumber) && (b._bitlen > a._bitlen)) {
        return a.like(b);
    }
    return a.clone();
}

/** @description assert `a` & `b` have the same signedness */
function _restrictionSameSignedness(a: BaseNumber, b: Input, opname: string) {
    if (b instanceof BaseNumber) {
        if (a._signed != b._signed) {
            throw new TypeError(
                `Operator "${opname}" not compatible with types ${a.constructor.name} and ${b.constructor.name}.`
            );
        }
    }
}

/** @description assert `a` has larger bitlen than `b` */
function _restrictionLargerBitlen(a: BaseNumber, b: Input, opname: string) {
    if (b instanceof BaseNumber) {
        if (a._bitlen < b._bitlen) {
            throw new TypeError(`Operator "${opname}" not compatible with ${a.constructor.name} and a larger type ${b.constructor.name}`);
        }
    }
}

/** @description assert `b` is unsigned */
function _restrictionUnsignedB(b: Input, opname: string) {
    if (b instanceof BaseNumber) {
        if (b._signed) {
            throw new TypeError(`Operator "${opname}" not compatible with signed type ${b.constructor.name}`);
        }
    }
    else {
        if ((new BN(b)).isNeg()) {
            throw new TypeError(`Operator "${opname}" not compatible with negative value ${b}`);
        }
    }
}

/** @description assert `b` fits into the range of type `a` */
function _restrictionBNInBounds(a: BaseNumber, b: Input) {
    if (!(b instanceof BaseNumber)) {
        const bn = new BN(b);
        if (bn.lt(a._lbound) || bn.gt(a._ubound)) {
            throw new TypeError(`Right operand ${b} does not fit into type ${a.constructor.name}`);
        }
    }
}

function _onlyUnchecked(opname: string) {
    if (!isUnchecked()) {
        throw new TypeError(`Operator ${opname} can only be performed in unchecked mode`);
    }
}


/** @description returns a BN instance */
function _getBN(b: Input): BN {
    return b instanceof BaseNumber ? b.bn : new BN(b);
}

export type ConcreteNumberClass = { new (number: Input): BaseNumber };

export abstract class BaseNumber {
    /** @description underlying BN */
    bn: BN;
    /** @description bit length (size) of this type */
    static _bitlen = 0;
    /** @description max representable number of this type */
    static _ubound: BN;
    /** @description min representable number of this type */
    static _lbound: BN;
    /** @description whether this type is signed or unsigned */
    static _signed: boolean;

    constructor(number: Input) {
        if (number instanceof BaseNumber) {
            this.bn = number.bn.clone();
        }
        else {
            this.bn = new BN(number);
        }
        this._checkBounds();
    }

    /** @description bit length (size) of this type */
    get _bitlen(): number {
        // @ts-ignore
        return this.constructor._bitlen;
    }
    /** @description max representable number of this type */
    get _ubound(): BN {
        // @ts-ignore
        return this.constructor._ubound;
    }
    /** @description min representable number of this type */
    get _lbound(): BN {
        // @ts-ignore
        return this.constructor._lbound;
    }
    /** @description bit length (size) of this type */
    get _signed(): boolean {
        // @ts-ignore
        return this.constructor._signed;
    }

    /** @description constructor as static function supporting subclasses */
    static _new<T extends BaseNumber>(number: Input): T {
        return new (this as unknown as new(_number: Input) => T)(number);
    }

    /** @description max representable number of this type */
    static max<T extends BaseNumber>(): T {
        return this._new(this._ubound);
    }

    /** @description min representable number of this type */
    static min<T extends BaseNumber>(): T {
        return this._new(this._lbound);
    }

    /** @description makes a copy of this number */
    clone(): this {
        // @ts-ignore call static function
        return this.constructor._new(this.bn.clone());
    }

    /** @description string representation of underlying value */
    toString(base=10): string {
        return this.bn.toString(base);
    }

    /** @description string representation of instance */
    [util.inspect.custom](): string {
        return `${this.constructor.name}(${this.bn.toString()})`;
    }

    /** @description performs integer wrap around in-place */
    abstract _iwraparound(): this;

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

    /** @description cast to another BaseNumber subclass type */
    as<T extends BaseNumber>(btype: typeof BaseNumber): T {
        if (this._signed != btype._signed) {
            throw new TypeError(
                `Cannot cast ${this.constructor.name} to ${btype.name}.`
            );
        }
        return btype._new(this.bn);
    }

    /** @description cast to another BaseNumber subclass type */
    like<T extends BaseNumber>(b: T): T {
        if (this._signed != b._signed) {
            throw new TypeError(
                `Cannot cast ${this.constructor.name} to ${b.constructor.name}.`
            );
        }
        // @ts-ignore
        return b.constructor._new(this.bn);
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

    add(b: Input): BaseNumber {
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

    sub(b: Input): BaseNumber {
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

    mul(b: Input): BaseNumber {
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

    div(b: Input): BaseNumber {
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

    mod(b: Input): BaseNumber {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "mod");
        const r = _newOutOfPlaceNumber(this, b);
        const bn = _getBN(b);
        r.bn = r.bn.mod(bn);
        return r._checkBounds();
    }

    pow(b: Input): BaseNumber {
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
        const mbn = _getBN(b);
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
        const mbn = _getBN(b);
        const r = this.clone();
        r.bn = r.bn.mul(bbn).mod(mbn);
        return r._checkBounds();
    }

    // shift
    // never overflow

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
        this.bn.iushrn(bn.toNumber());
        return this._iwraparound();
    }

    shrn(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionUnsignedB(b, "shrn");
        const bn = _getBN(b);
        const r = this.clone();
        r.bn.iushrn(bn.toNumber());
        return r._iwraparound();
    }

    // bit

    iand(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "iand");
        _restrictionLargerBitlen(this, b, "iand");
        const bn = _getBN(b);
        this.bn.iuand(bn);
        // and() will take the smallest bit len and don't need to wrap
        return this;
    }

    and(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "and");
        const r = this.clone();
        const bn = _getBN(b);
        r.bn.iuand(bn);
        return r;
    }

    ior(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ior");
        _restrictionLargerBitlen(this, b, "ior");
        const bn = _getBN(b);
        this.bn.iuor(bn);
        return this._iwraparound();
    }

    or(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "or");
        const r = this.clone();
        const bn = _getBN(b);
        r.bn.iuor(bn);
        return r._iwraparound();
    }

    ixor(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "ixor");
        _restrictionLargerBitlen(this, b, "ixor");
        const bn = _getBN(b);
        this.bn.iuxor(bn);
        return this._iwraparound();
    }

    xor(b: Input): this {
        _restrictionBNInBounds(this, b);
        _restrictionSameSignedness(this, b, "xor");
        const r = this.clone();
        const bn = _getBN(b);
        r.bn.iuxor(bn);
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
        // @ts-ignore
        return this.constructor._new(+(this.gt(b)));
    }

    lt_(b: Input): this {
        // @ts-ignore
        return this.constructor._new(+(this.lt(b)));
    }

    gte_(b: Input): this {
        // @ts-ignore
        return this.constructor._new(+(this.gte(b)));
    }

    lte_(b: Input): this {
        // @ts-ignore
        return this.constructor._new(+(this.lte(b)));
    }

    eq_(b: Input): this {
        // @ts-ignore
        return this.constructor._new(+(this.eq(b)));
    }

    neq_(b: Input): this {
        // @ts-ignore
        return this.constructor._new(+(this.neq(b)));
    }
}
