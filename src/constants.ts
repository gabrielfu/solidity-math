import BN from "bn.js";

export const BN0 = new BN(0);
export const BN1 = new BN(1);
export const BN2 = new BN(2);
export const BN128 = new BN(128);
export const BN256 = new BN(256);

interface bitValues {
    bn: BN;
    powerOf2: BN;
    uintmax: BN;
    intmax: BN;
    intmin: BN;
}

function _computeValues(bitlen: number): bitValues {
    const bn = new BN(bitlen);
    const powerOf2 = BN2.pow(bn);
    const uintmax = powerOf2.sub(BN1);
    const intmax = powerOf2.div(BN2).sub(BN1);
    const intmin = powerOf2.div(BN2).neg();
    return { bn, powerOf2, uintmax, intmax, intmin };
}

export const bit8 = _computeValues(8);
export const bit16 = _computeValues(16);
export const bit24 = _computeValues(24);
export const bit32 = _computeValues(32);
export const bit40 = _computeValues(40);
export const bit48 = _computeValues(48);
export const bit56 = _computeValues(56);
export const bit64 = _computeValues(64);
export const bit72 = _computeValues(72);
export const bit80 = _computeValues(80);
export const bit88 = _computeValues(88);
export const bit96 = _computeValues(96);
export const bit104 = _computeValues(104);
export const bit112 = _computeValues(112);
export const bit120 = _computeValues(120);
export const bit128 = _computeValues(128);
export const bit136 = _computeValues(136);
export const bit144 = _computeValues(144);
export const bit152 = _computeValues(152);
export const bit160 = _computeValues(160);
export const bit168 = _computeValues(168);
export const bit176 = _computeValues(176);
export const bit184 = _computeValues(184);
export const bit192 = _computeValues(192);
export const bit200 = _computeValues(200);
export const bit208 = _computeValues(208);
export const bit216 = _computeValues(216);
export const bit224 = _computeValues(224);
export const bit232 = _computeValues(232);
export const bit240 = _computeValues(240);
export const bit248 = _computeValues(248);
export const bit256 = _computeValues(256);

const bits = new Map([
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

export function _getBitValues(bitlen: number): bitValues {
    return bits.get(bitlen) as bitValues;
}