"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getBitValues = exports.bit256 = exports.bit248 = exports.bit240 = exports.bit232 = exports.bit224 = exports.bit216 = exports.bit208 = exports.bit200 = exports.bit192 = exports.bit184 = exports.bit176 = exports.bit168 = exports.bit160 = exports.bit152 = exports.bit144 = exports.bit136 = exports.bit128 = exports.bit120 = exports.bit112 = exports.bit104 = exports.bit96 = exports.bit88 = exports.bit80 = exports.bit72 = exports.bit64 = exports.bit56 = exports.bit48 = exports.bit40 = exports.bit32 = exports.bit24 = exports.bit16 = exports.bit8 = exports.BN256 = exports.BN128 = exports.BN2 = exports.BN1 = exports.BN0 = void 0;
var bn_js_1 = __importDefault(require("bn.js"));
exports.BN0 = new bn_js_1.default(0);
exports.BN1 = new bn_js_1.default(1);
exports.BN2 = new bn_js_1.default(2);
exports.BN128 = new bn_js_1.default(128);
exports.BN256 = new bn_js_1.default(256);
function _computeValues(bitlen) {
    var bn = new bn_js_1.default(bitlen);
    var powerOf2 = exports.BN2.pow(bn);
    var uintmax = powerOf2.sub(exports.BN1);
    var uintmin = exports.BN0;
    var intmax = powerOf2.div(exports.BN2).sub(exports.BN1);
    var intmin = powerOf2.div(exports.BN2).neg();
    return { bn: bn, powerOf2: powerOf2, uintmax: uintmax, uintmin: uintmin, intmax: intmax, intmin: intmin };
}
exports.bit8 = _computeValues(8);
exports.bit16 = _computeValues(16);
exports.bit24 = _computeValues(24);
exports.bit32 = _computeValues(32);
exports.bit40 = _computeValues(40);
exports.bit48 = _computeValues(48);
exports.bit56 = _computeValues(56);
exports.bit64 = _computeValues(64);
exports.bit72 = _computeValues(72);
exports.bit80 = _computeValues(80);
exports.bit88 = _computeValues(88);
exports.bit96 = _computeValues(96);
exports.bit104 = _computeValues(104);
exports.bit112 = _computeValues(112);
exports.bit120 = _computeValues(120);
exports.bit128 = _computeValues(128);
exports.bit136 = _computeValues(136);
exports.bit144 = _computeValues(144);
exports.bit152 = _computeValues(152);
exports.bit160 = _computeValues(160);
exports.bit168 = _computeValues(168);
exports.bit176 = _computeValues(176);
exports.bit184 = _computeValues(184);
exports.bit192 = _computeValues(192);
exports.bit200 = _computeValues(200);
exports.bit208 = _computeValues(208);
exports.bit216 = _computeValues(216);
exports.bit224 = _computeValues(224);
exports.bit232 = _computeValues(232);
exports.bit240 = _computeValues(240);
exports.bit248 = _computeValues(248);
exports.bit256 = _computeValues(256);
var bits = new Map([
    [8, exports.bit8],
    [16, exports.bit16],
    [24, exports.bit24],
    [32, exports.bit32],
    [40, exports.bit40],
    [48, exports.bit48],
    [56, exports.bit56],
    [64, exports.bit64],
    [72, exports.bit72],
    [80, exports.bit80],
    [88, exports.bit88],
    [96, exports.bit96],
    [104, exports.bit104],
    [112, exports.bit112],
    [120, exports.bit120],
    [128, exports.bit128],
    [136, exports.bit136],
    [144, exports.bit144],
    [152, exports.bit152],
    [160, exports.bit160],
    [168, exports.bit168],
    [176, exports.bit176],
    [184, exports.bit184],
    [192, exports.bit192],
    [200, exports.bit200],
    [208, exports.bit208],
    [216, exports.bit216],
    [224, exports.bit224],
    [232, exports.bit232],
    [240, exports.bit240],
    [248, exports.bit248],
    [256, exports.bit256],
]);
function _getBitValues(bitlen) {
    return bits.get(bitlen);
}
exports._getBitValues = _getBitValues;
