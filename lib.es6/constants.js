import BN from "bn.js";
export var BN0 = new BN(0);
export var BN1 = new BN(1);
export var BN2 = new BN(2);
export var BN128 = new BN(128);
export var BN256 = new BN(256);
function _computeValues(bitlen) {
    var bn = new BN(bitlen);
    var powerOf2 = BN2.pow(bn);
    var uintmax = powerOf2.sub(BN1);
    var intmax = powerOf2.div(BN2).sub(BN1);
    var intmin = powerOf2.div(BN2).neg();
    return { bn: bn, powerOf2: powerOf2, uintmax: uintmax, intmax: intmax, intmin: intmin };
}
export var bit8 = _computeValues(8);
export var bit16 = _computeValues(16);
export var bit24 = _computeValues(24);
export var bit32 = _computeValues(32);
export var bit40 = _computeValues(40);
export var bit48 = _computeValues(48);
export var bit56 = _computeValues(56);
export var bit64 = _computeValues(64);
export var bit72 = _computeValues(72);
export var bit80 = _computeValues(80);
export var bit88 = _computeValues(88);
export var bit96 = _computeValues(96);
export var bit104 = _computeValues(104);
export var bit112 = _computeValues(112);
export var bit120 = _computeValues(120);
export var bit128 = _computeValues(128);
export var bit136 = _computeValues(136);
export var bit144 = _computeValues(144);
export var bit152 = _computeValues(152);
export var bit160 = _computeValues(160);
export var bit168 = _computeValues(168);
export var bit176 = _computeValues(176);
export var bit184 = _computeValues(184);
export var bit192 = _computeValues(192);
export var bit200 = _computeValues(200);
export var bit208 = _computeValues(208);
export var bit216 = _computeValues(216);
export var bit224 = _computeValues(224);
export var bit232 = _computeValues(232);
export var bit240 = _computeValues(240);
export var bit248 = _computeValues(248);
export var bit256 = _computeValues(256);
var bits = new Map([
    [8, bit8],
    [16, bit16],
    [24, bit24],
    [32, bit32],
    [40, bit40],
    [48, bit48],
    [56, bit56],
    [64, bit64],
    [72, bit72],
    [80, bit80],
    [88, bit88],
    [96, bit96],
    [104, bit104],
    [112, bit112],
    [120, bit120],
    [128, bit128],
    [136, bit136],
    [144, bit144],
    [152, bit152],
    [160, bit160],
    [168, bit168],
    [176, bit176],
    [184, bit184],
    [192, bit192],
    [200, bit200],
    [208, bit208],
    [216, bit216],
    [224, bit224],
    [232, bit232],
    [240, bit240],
    [248, bit248],
    [256, bit256],
]);
export function _getBitValues(bitlen) {
    return bits.get(bitlen);
}
