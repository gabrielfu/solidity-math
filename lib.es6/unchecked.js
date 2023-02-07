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
/** @description unique switch flag indicating whether we are in unchecked mode */
var _UNCHECKED = false;
/** @description Performs the callback function under unchecked mode */
export function unchecked(callback) {
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
/** @description returns true if unchecked mode is on */
export function isUnchecked() {
    return _UNCHECKED;
}
