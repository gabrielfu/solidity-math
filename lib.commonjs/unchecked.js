"use strict";
/**
 * Usage:
 *
 * ``` code
 * import { unchecked } from "solidity-math";
 *
 * unchecked(() => {
 *   // perform your unchecked solidity math
 * })
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnchecked = exports.unchecked = void 0;
/** @description unique switch flag indicating whether we are in unchecked mode */
var _UNCHECKED = false;
/** @description Performs the callback function under unchecked mode */
function unchecked(callback) {
    _UNCHECKED = true;
    var e = null;
    var result = null;
    try {
        result = callback();
    }
    catch (error) {
        e = error;
    }
    _UNCHECKED = false;
    if (e != null) {
        console.error("Encounter error in unchecked mode: ".concat(callback.toString()));
        throw e;
    }
    return result;
}
exports.unchecked = unchecked;
/** @description returns true if unchecked mode is on */
function isUnchecked() {
    return _UNCHECKED;
}
exports.isUnchecked = isUnchecked;
