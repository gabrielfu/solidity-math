import * as BN from "bn.js";

export const BN0 = new BN(0);
export const BN1 = new BN(1);
export const BN2 = new BN(2);
export const BN8 = new BN(8);
export const BN128 = new BN(128);
export const BN256 = new BN(256);
export const bit8 = BN2.pow(BN8);
export const bit128 = BN2.pow(BN128);
export const bit256 = BN2.pow(BN256);

export const ranges: Map<number, BN> = new Map([
    [2, BN2.pow(BN2)],
    [8, BN2.pow(BN8)],
    [128, BN2.pow(BN128)],
    [256, BN2.pow(BN256)],
]);

ranges.set(8, BN0);