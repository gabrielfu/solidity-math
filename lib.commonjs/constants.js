"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBound = exports.BN2 = exports.BN1 = exports.BN0 = void 0;
var bn_js_1 = __importDefault(require("bn.js"));
var lodash_memoize_1 = __importDefault(require("lodash.memoize"));
exports.BN0 = new bn_js_1.default(0);
exports.BN1 = new bn_js_1.default(1);
exports.BN2 = new bn_js_1.default(2);
var powerOf2 = (0, lodash_memoize_1.default)(function (bitlen) {
    return exports.BN2.pow(new bn_js_1.default(bitlen));
});
function ubound(bitlen, signed) {
    if (signed) {
        return powerOf2(bitlen).div(exports.BN2).sub(exports.BN1);
    }
    else {
        return powerOf2(bitlen).sub(exports.BN1);
    }
}
function lbound(bitlen, signed) {
    if (signed) {
        return powerOf2(bitlen).div(exports.BN2).neg();
    }
    else {
        return exports.BN0;
    }
}
var resolver = function (bitlen, signed, upper) { return "".concat(bitlen).concat(signed).concat(upper); };
exports.getBound = (0, lodash_memoize_1.default)(function (bitlen, signed, upper) {
    if (upper) {
        return ubound(bitlen, signed);
    }
    else {
        return lbound(bitlen, signed);
    }
}, resolver);
