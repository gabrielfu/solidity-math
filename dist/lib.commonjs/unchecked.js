"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnchecked = exports.unchecked = void 0;
var contextlib_1 = require("./contextlib");
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
function unchecked(callback) {
    (0, contextlib_1.With)(uncheckedCm, callback);
}
exports.unchecked = unchecked;
/** @description returns true if unchecked mode is on */
function isUnchecked() {
    return _UNCHECKED;
}
exports.isUnchecked = isUnchecked;
