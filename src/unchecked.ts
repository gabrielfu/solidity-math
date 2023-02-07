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

/** @description unique switch flag indicating whether we are in unchecked mode */
let _UNCHECKED = false;

/** @description Performs the callback function under unchecked mode */
export function unchecked(callback: () => void): void {
    _UNCHECKED = true;
    let e: any = null;
    try {
        callback();
    } catch (error) {
        e = error;
    }
    _UNCHECKED = false;
    if (e != null) {
        throw e;
    }
}

/** @description returns true if unchecked mode is on */
export function isUnchecked(): boolean {
    return _UNCHECKED;
}