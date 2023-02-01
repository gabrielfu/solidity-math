# solidity-math

This package extends [bn.js](https://github.com/indutny/bn.js/) to implement 
Solidity integer types and operations. It is useful for replicating public Solidity contract interactions, particularly when developing autonomous agents and DeFi programs.

## Features
- ✅ Compatible with Solidity 0.8.17
- ✅ Comprehensive Solidity integer types
    - Unsigned integers: `uint8`, `uint16`, ..., `uint256`
    - Signed integers: `int8`, `int16`, ..., `int256`
- ✅ Checked & unchecked modes
- ✅ Type safety checks
- ✅ Provides arithmetic, bit, shift & comparison operators

## Table of Contents
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
    + [Types](#types)
        - [Creation](#creation)
        - [Maximum and minimum](#maximum-and-minimum)
    + [Arithmetics](#arithmetics)
    + [Unchecked mode](#unchecked-mode)
* [Example](#example)
    + [Unchecked](#unchecked)

## Installation

## Usage

## Documentation

### Types
*Note 1: `uint` & `int` aliases are not implemented as they are redundant and confusing.*

*Note 2: Fixed point numbers are not implemented because it's not fully supported by Solidity yet as of 0.8.17.*

| Unsigned   | Signed   |
|------------|----------|
| `Uint8`    | `Int8`   |
| `Uint16`   | `Int16`  |
| `Uint24`   | `Int24`  |
| `Uint32`   | `Int32`  |
| `Uint40`   | `Int40`  |
| `Uint48`   | `Int48`  |
| `Uint56`   | `Int56`  |
| `Uint64`   | `Int64`  |
| `Uint72`   | `Int72`  |
| `Uint80`   | `Int80`  |
| `Uint88`   | `Int88`  |
| `Uint96`   | `Int96`  |
| `Uint104`  | `Int104` |
| `Uint112`  | `Int112` |
| `Uint120`  | `Int120` |
| `Uint128`  | `Int128` |
| `Uint136`  | `Int136` |
| `Uint144`  | `Int144` |
| `Uint152`  | `Int152` |
| `Uint160`  | `Int160` |
| `Uint168`  | `Int168` |
| `Uint176`  | `Int176` |
| `Uint184`  | `Int184` |
| `Uint192`  | `Int192` |
| `Uint200`  | `Int200` |
| `Uint208`  | `Int208` |
| `Uint216`  | `Int216` |
| `Uint224`  | `Int224` |
| `Uint232`  | `Int232` |
| `Uint240`  | `Int240` |
| `Uint248`  | `Int248` |
| `uint256`  | `int256` |

#### Creation
You can use the class constructor `new Uint256()` or the alias function `uint256()`, which are equivalent.
The same also applies to signed integer classes.

```typescript
import { Uint256, uint256 } from "solidity-math";

// these two are equivalent
let a = new Uint256(100);
let b = uint256(100);

a.eq(b); // true
```

#### Maximum and minimum
For any type, e.g. `Uint256`, you can use `Uint256.min()` and `Uint256.max()` to access the minimum and maximum value representable by the type.

```typescript
import { Uint256 } from "solidity-math";

let a = Uint256.max();
console.log(a); // Uint256(bn=115792089237316195423570985008687907853269984665640564039457584007913129639935)
```

### Arithmetics

### Unchecked mode

To mimic Solidity `unchecked` arithmetic:
```typescript
import { unchecked } from "solidity-math";

unchecked(() => {
    // your calcuations
    ...
});
```

## Example

### Unchecked 

```solidity
// Solidity code
uint256 x;
uint256 y;
uint256 z;

unchecked {
    z = x - y;
}
```

```typescript
// Typescript equivalent
import { uint256, unchecked } from "solidity-math";

let x = uint256(0);
let y = uint256(0);
let z = uint256(0);

unchecked(() => {
    z = x.sub(y);
});
```
