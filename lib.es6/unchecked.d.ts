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
/** @description Performs the callback function under unchecked mode */
export declare function unchecked<T>(callback: () => T): T;
/** @description returns true if unchecked mode is on */
export declare function isUnchecked(): boolean;
