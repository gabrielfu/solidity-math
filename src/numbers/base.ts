import * as BN from "bn.js";
import * as util from "util";
import { isUnchecked } from "../unchecked";

/** @description valid types to construct a new BN from */
export type BNInput = number | string | number[] | Uint8Array | Buffer | BN;

/** @description assert a & b are of the same type */
function _assertSameType<T1 extends BaseNumber, T2 extends BaseNumber>(a: T1, b: T2, opname: string) {
    let atype = a.constructor.name;
    let btype = b.constructor.name;
    if (atype != btype) {
        throw new TypeError(
            `Operator ${opname} not compatible with types ${atype} and ${btype}.`
        );
    }
}

/** @description assert a & b are of the same signedness */
function _assertSameSignedNess<T1 extends BaseNumber, T2 extends BaseNumber>(a: T1, b: T2, opname: string) {
    // @ts-ignore
    if (a.constructor._signed != b.constructor._signed) {
        throw new TypeError(
            // @ts-ignore
            `Operator "${opname}" not compatible with types ${a.constructor.name} and ${b.constructor.name}.`
        );
    }
}

/** @description assert b is unsigned */
function _assertUnsigned<T extends BaseNumber>(b: T, opname: string) {
    // @ts-ignore
    if (b.constructor._signed) {
        throw new TypeError(`Operator "${opname}" not compatible with signed type ${b.constructor.name}`);
    }
}

/** @description assert b is signed */
function _assertSigned<T extends BaseNumber>(b: T, opname: string) {
    // @ts-ignore
    if (!b.constructor._signed) {
        throw new TypeError(`Operator "${opname}" not compatible with unsigned type ${b.constructor.name}`);
    }
}

/** @description assert b >= 0 */
function _assertNonNegative(b: number, opname: string) {
    // @ts-ignore
    if (b < 0) {
        throw new TypeError(`Operator "${opname}" not compatible with negative value ${b}`);
    }
}


/** @description assert a has larger bitlen */
function _assertLargerType<T1 extends BaseNumber, T2 extends BaseNumber>(a: T1, b: T2, opname: string) {
    if (a._bitlen < b._bitlen) {
        throw new TypeError(`Operator "${opname}" not compatible with ${a.constructor.name} and a larger type ${b.constructor.name}`);
    }
}


/** 
 * @description 
 * Cast both a and b to the larger type among the two.
 * Returns new instances.
 */
function _castToLargerType<T1 extends BaseNumber, T2 extends BaseNumber>(a: T1, b: T2): (T1|T2)[] {
    // @ts-ignore
    if (a._bitlen > b._bitlen) {
        return [a.clone(), b.like(a)];
    } 
    if (a._bitlen < b._bitlen) {
        return [a.like(b), b.clone()];
    } 
    return [a.clone(), b.clone()];
}


/** @description performs binary operation */
function binaryOp<T extends BaseNumber>(a: T, b: T, opname: keyof BN): any {
    // @ts-ignore // ignores [opname]
    return a.bn[opname](b.bn); 
}

export abstract class BaseNumber {
    /** @description underlying BN */
    bn: BN;
    /** @description bit length (size) of this type */
    static _bitlen: number = 0;
    /** @description max representable number of this type */
    static _ubound: BN;
    /** @description min representable number of this type */
    static _lbound: BN;
    /** @description whether this type is signed or unsigned */
    static _signed: Boolean;

    constructor(number: BNInput) {
        this.bn = new BN(number);
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

    /** @description constructor as static function supporting subclasses */
    static _new<T extends BaseNumber>(number: BNInput): T {
        return new (this as unknown as new(_number: BNInput) => T)(number);
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
    toString(base=10) {
        return this.bn.toString(base);
    }

    /** @description string representation of instance */
    [util.inspect.custom]() {
        return `${this.constructor.name}(bn=${this.bn.toString()})`;
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
            throw new RangeError(`Value under/overflow: ${util.inspect(this)}`);
        }
    }

    /** @description cast to another BaseNumber subclass type */
    as<T extends BaseNumber>(b: typeof BaseNumber): T {
        // TODO: _assertSameSignedNess()
        return b._new(this.bn);
    }

    /** @description cast to another BaseNumber subclass type */
    like<T extends BaseNumber>(b: T): T {
        _assertSameSignedNess(this, b, "like");
        // @ts-ignore
        return b.constructor._new(this.bn);
    }

    // arithmetic

    iadd(b: this): this {
        _assertSameSignedNess(this, b, "iadd");
        _assertLargerType(this, b, "iadd");
        this.bn.iadd(b.bn);
        return this._checkBounds();
    }

    add(b: this): this {
        _assertSameSignedNess(this, b, "add");
        let [r, _b] = _castToLargerType(this, b);
        r.bn.iadd(b.bn);
        return r._checkBounds();
    }

    isub(b: this): this {
        _assertSameSignedNess(this, b, "isub");
        _assertLargerType(this, b, "isub");
        binaryOp(this, b, "isub");
        return this._checkBounds();
    }

    sub(b: this): this {
        _assertSameSignedNess(this, b, "sub");
        let [r, _b] = _castToLargerType(this, b);
        r.bn.isub(b.bn);
        return r._checkBounds();
    }

    imul(b: this): this {
        _assertSameSignedNess(this, b, "imul");
        _assertLargerType(this, b, "imul");
        this.bn.imul(b.bn);
        return this._checkBounds();
    }

    mul(b: this): this {
        _assertSameSignedNess(this, b, "mul");
        let [r, _b] = _castToLargerType(this, b);
        r.bn.imul(b.bn);
        return r._checkBounds();
    }

    idiv(b: this): this {
        _assertSameSignedNess(this, b, "idiv");
        _assertLargerType(this, b, "idiv");
        this.bn = this.bn.div(b.bn);
        return this._checkBounds();
    }

    div(b: this): this {
        _assertSameSignedNess(this, b, "mul");
        let [r, _b] = _castToLargerType(this, b);
        r.bn = r.bn.div(b.bn);
        return r._checkBounds();
    }

    imod(b: this): this {
        _assertSameSignedNess(this, b, "imod");
        _assertLargerType(this, b, "imod");
        this.bn = this.bn.mod(b.bn);
        return this._checkBounds();
    }

    mod(b: this): this {
        _assertSameSignedNess(this, b, "mod");
        let [r, _b] = _castToLargerType(this, b);
        r.bn = r.bn.mod(b.bn);
        return r._checkBounds();
    }

    pow(b: this): this {
        _assertUnsigned(b, "pow");
        let r = this.clone();
        r.bn = r.bn.pow(b.bn);
        return r._checkBounds();
    }

    addmod(b: this, m: this): this {
        _assertSameSignedNess(this, b, "addmod");
        _assertSameSignedNess(this, m, "addmod");
        let r = this.clone();
        r.bn = r.bn.add(b.bn).mod(m.bn);
        return r._checkBounds();
    }

    mulmod(b: this, m: this): this {
        _assertSameSignedNess(this, b, "mulmod");
        _assertSameSignedNess(this, m, "mulmod");
        let r = this.clone();
        r.bn = r.bn.mul(b.bn).mod(m.bn);
        return r._checkBounds();
    }

    // shift
    // never under / overflows

    ishln(b: this | number): this {
        if (typeof b != "number") {
            _assertUnsigned(b, "shln");
            b = b.bn.toNumber();
        }
        _assertNonNegative(b, "shln");
        this.bn.iushln(b);
        return this;
    }

    shln(b: this | number): this {
        let r = this.clone();
        r.ishln(b);
        return r;
    }

    ishrn(b: this | number): this {
        if (typeof b != "number") {
            _assertUnsigned(b, "shrn");
            b = b.bn.toNumber();
        }
        _assertNonNegative(b, "shrn");
        this.bn.iushrn(b);
        return this;
    }

    shrn(b: this | number): this {
        let r = this.clone();
        r.ishrn(b);
        return r;
    }

    // bit

    iand(b: this): this {
        _assertSameSignedNess(this, b, "and");
        binaryOp(this, b, "iuand");
        return this;
    }

    and(b: this): this {
        return this.clone().iand(b);
    }

    ior(b: this): this {
        _assertSameSignedNess(this, b, "or");
        binaryOp(this, b, "iuor");
        return this;
    }

    or(b: this): this {
        return this.clone().ior(b);
    }

    ixor(b: this): this {
        _assertSameSignedNess(this, b, "xor");
        binaryOp(this, b, "iuxor");
        return this;
    }

    xor(b: this): this {
        return this.clone().ixor(b);
    }

    inot(): this {
        // @ts-ignore
        this.bn.inotn(this.constructor._bitlen);
        return this;
    }

    not(): this {
        return this.clone().inot();
    }

    // comparison

    gt(b: this): Boolean {
        _assertSameSignedNess(this, b, "gt");
        return binaryOp(this, b, "gt");
    }

    lt(b: this): Boolean {
        _assertSameSignedNess(this, b, "lt");
        return binaryOp(this, b, "lt");
    }

    gte(b: this): Boolean {
        _assertSameSignedNess(this, b, "gte");
        return binaryOp(this, b, "gte");
    }

    lte(b: this): Boolean {
        _assertSameSignedNess(this, b, "lte");
        return binaryOp(this, b, "lte");
    }

    eq(b: this): Boolean {
        _assertSameSignedNess(this, b, "eq");
        return binaryOp(this, b, "eq");
    }

    neq(b: this): Boolean {
        _assertSameSignedNess(this, b, "neq");
        return !binaryOp(this, b, "eq");
    }
}
