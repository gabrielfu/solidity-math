/**
 * Usage:
 * 
 * ``` code
 * import { unchecked } from "./unchecked";
 * 
 * unchecked(() => {
 *   // perform your unchecked solidity math
 * })
 * ```
 */

import { With } from "./contextlib";

/** @description unique switch flag indicating whether we are in unchecked mode */
var _UNCHECKED: Boolean = false;

/** @description context manager *class* to trigger unchecked mode */
class UncheckedContextManager {
    enter() {
        _UNCHECKED = true;
    }

    exit() {
        _UNCHECKED = false;
    }
}

/** @description context manager *instance* to trigger unchecked mode */
const uncheckedCm = new UncheckedContextManager();

/** @description Performs the callback function under unchecked mode */
export function unchecked(callback: (val: void) => unknown): void {
    With(uncheckedCm, callback);
}

/** @description returns true if unchecked mode is on */
export function isUnchecked(): Boolean {
    return _UNCHECKED;
}