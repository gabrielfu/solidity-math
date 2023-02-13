import BN from "bn.js";
import memoize from "lodash.memoize";
export var BN0 = new BN(0);
export var BN1 = new BN(1);
export var BN2 = new BN(2);
var powerOf2 = memoize(function (bitlen) {
    return BN2.pow(new BN(bitlen));
});
function ubound(bitlen, signed) {
    if (signed) {
        return powerOf2(bitlen).div(BN2).sub(BN1);
    }
    else {
        return powerOf2(bitlen).sub(BN1);
    }
}
function lbound(bitlen, signed) {
    if (signed) {
        return powerOf2(bitlen).div(BN2).neg();
    }
    else {
        return BN0;
    }
}
var resolver = function (bitlen, signed, upper) { return "".concat(bitlen).concat(signed).concat(upper); };
export var getBound = memoize(function (bitlen, signed, upper) {
    if (upper) {
        return ubound(bitlen, signed);
    }
    else {
        return lbound(bitlen, signed);
    }
}, resolver);
