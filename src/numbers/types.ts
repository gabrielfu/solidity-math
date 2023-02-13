import { BaseInteger, Input } from "./base";
import { Int } from "./int";
import { Uint } from "./uint";
import * as C from "../constants";

/** @description min representable number of the type of `a` */
export function min(type: string): BaseInteger {
    const { signed, bitlen } = parseType(type);
    if (signed) {
        return new Int(C._getBitValues(bitlen).intmin, bitlen);
    }
    else {
        return new Uint(C._getBitValues(bitlen).uintmin, bitlen);
    }
}

/** @description max representable number of the type of `a` */
export function max(type: string): BaseInteger {
    const { signed, bitlen } = parseType(type);
    if (signed) {
        return new Int(C._getBitValues(bitlen).intmax, bitlen);
    }
    else {
        return new Uint(C._getBitValues(bitlen).uintmax, bitlen);
    }
}

export function parseType(type: string) {
    let signed: boolean;
    let bitlen: number;
    if (type.slice(0, 3) == "int") {
        signed = true;
        bitlen = parseInt(type.slice(3));
    }
    else if (type.slice(0, 4) == "uint") {
        signed = false;
        bitlen = parseInt(type.slice(4));
    }
    else {
        throw new Error(`Invalid type ${type}`);
    }
    return { signed, bitlen };
}