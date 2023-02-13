import BN from "bn.js";
import memoize from "lodash.memoize";

export const BN0 = new BN(0);
export const BN1 = new BN(1);
export const BN2 = new BN(2);

const powerOf2 = memoize(function(bitlen: number): BN {
    return BN2.pow(new BN(bitlen));
});

function ubound(bitlen: number, signed: boolean): BN {
    if (signed) {
        return powerOf2(bitlen).div(BN2).sub(BN1);
    }
    else {
        return powerOf2(bitlen).sub(BN1);
    }
}

function lbound(bitlen: number, signed: boolean): BN {
    if (signed) {
        return powerOf2(bitlen).div(BN2).neg();
    }
    else {
        return BN0;
    }
}

const resolver = (bitlen: number, signed: boolean, upper: boolean) => `${bitlen}${signed}${upper}`;

export const getBound = memoize(function(bitlen: number, signed: boolean, upper: boolean): BN {
    if (upper) {
        return ubound(bitlen, signed);
    }
    else {
        return lbound(bitlen, signed);
    }
}, resolver);