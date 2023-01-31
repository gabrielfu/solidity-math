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

class Unchecked {
    enter() {
        _UNCHECKED = true;
    }

    exit() {
        _UNCHECKED = false;
    }
}

export const unchecked = new Unchecked();

export function isUnchecked() {
    return _UNCHECKED;
}