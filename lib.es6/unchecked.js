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
var _UNCHECKED = false;
/** @description context manager *class* to trigger unchecked mode */
var UncheckedContextManager = /** @class */ (function () {
    function UncheckedContextManager() {
    }
    UncheckedContextManager.prototype.enter = function () {
        _UNCHECKED = true;
    };
    UncheckedContextManager.prototype.exit = function () {
        _UNCHECKED = false;
    };
    return UncheckedContextManager;
}());
/** @description context manager *instance* to trigger unchecked mode */
var uncheckedCm = new UncheckedContextManager();
/** @description Performs the callback function under unchecked mode */
export function unchecked(callback) {
    With(uncheckedCm, callback);
}
/** @description returns true if unchecked mode is on */
export function isUnchecked() {
    return _UNCHECKED;
}
