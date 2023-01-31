/**
 * Usage:
 * 
 * ``` code
 * import { With, unchecked, isUnchecked } from "./unchecked";
 * 
 * With(unchecked, () => {
 *   console.log("_UNCHECKED:", isUnchecked());
 * })
 * ```
 */

export { With } from "./contextlib";

/** @description unique switch flag indicating whether we are in unchecked mode */
var _UNCHECKED: Boolean = false;

/** @description context manager *class* to trigger unchecked mode */
class Unchecked {
    enter() {
        _UNCHECKED = true;
    }

    exit() {
        _UNCHECKED = false;
    }
}

/** @description context manager *instance* to trigger unchecked mode */
export const unchecked = new Unchecked();

/** @description returns true if unchecked mode is on */
export function isUnchecked(): Boolean {
    return _UNCHECKED;
}