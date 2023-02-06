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
/** @description Performs the callback function under unchecked mode */
export declare function unchecked(callback: (val: void) => unknown): void;
/** @description returns true if unchecked mode is on */
export declare function isUnchecked(): boolean;
