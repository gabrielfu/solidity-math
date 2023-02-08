# solidity-math

This package extends [bn.js](https://github.com/indutny/bn.js/) to implement 
Solidity integer types and operations. It is useful for replicating public Solidity contract interactions, particularly when developing autonomous agents and DeFi programs.

## Features
- ✅ Compatible with Solidity 0.8.17
- ✅ Comprehensive Solidity integer types & operators
    - Unsigned integers: `uint8`, `uint16`, ..., `uint256`
    - Signed integers: `int8`, `int16`, ..., `int256`
- ✅ Inline assembly functions: `addmod()` & `mulmod()`
- ✅ Unchecked arithmetic
- ✅ Type safety checks
- ✅ Type casting
- ✅ Flexible right operand type (e.g. `uint256(20).add(10)`)
- ✅ Support for CommonJS & ES6

## Table of Contents
* [Features](#features)
* [Table of Contents](#table-of-contents)
* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
  + [Types](#types)
  + [Operations](#operations)
  + [Maximum and Minimum](#maximum-and-minimum)
  + [Overflow](#overflow)
  + [Unchecked Mode](#unchecked-mode)
  + [Casting](#casting)
* [Example](#example)
  + [Muldiv](#muldiv)

## Installation

## Usage
Named import:
```typescript
import { Uint256, uint256, unchecked } from "solidity-math";

// creating new numbers
const a = new Uint256(10); // create new Uint256 number
const b = uint256(20); // another way to create new Uint256 number

// arithmetic
console.log(a.add(b)); // Uint256(30)

// compatibility with other types
console.log(a.add(20)); // Uint256(30)
console.log(a.add("20")); // Uint256(30)
console.log(a.lte(0)); // false

// unchecked mode
// overflowing will wrap around
unchecked(() => {
    const c = Uint256.max().add(11);
    console.log(a.eq(c)); // true
});

// normal mode will overflow
console.log(a.sub(30)); // RangeError: Value overflow: Uint256(-20) 
```

Default import:
```typescript
import SM from "solidity-math";

const a = new SM.Uint256(10);
const b = SM.uint256(20);
const c = SM.unchecked(() => SM.Uint256.max().add(11));
```

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
| `Uint256`  | `Int256` |

The base class of all classes is `BaseNumber`, which cannot be imported or instantiated.

Each class also has a lowercase alias function for creating new numbers.
You can use the class constructor `new Uint256()` or the alias function `uint256()`, which are equivalent.
The created instance type will be `Uint256`.
```typescript
import { Uint256, uint256 } from "solidity-math";

// these two are equivalent
const a = new Uint256(100);
const b = uint256(100);

a.eq(b); // true
```

### Operations
There are restrictions on the types of operands, as enforced by Solidity:
```typescript
uint256(1).add(uint256(2)); // valid
uint256(1).add(int256(2)); // TypeError: Operator "add" not compatible with types Uint256 and Int256. 
uint64(1).iadd(uint256(2)) // TypeError: Operator "iadd" not compatible with Uint64 and a larger type Uint256
int256(1).pow(int256(-1)); // TypeError: Operator "pow" not compatible with signed type Int256
uint256(-1); // RangeError: Value overflow: Uint256(-1)
```

However, the right operand can also be a regular JS number, string, or another BN:
```typescript
uint256(1).add(2); // Uint256(3)
uint256(1).add("3"); // Uint256(4)
uint256(1).add(new BN(4)); // Uint256(5)

uint256(1).add(-1); // TypeError: Right operand -1 does not fit into type Uint256
int256(1).pow(-1); // TypeError: Operator "pow" not compatible with negative value -1
```

Restrictions:
| Symbol    | Description                                  |
|---------- |----------------------------------------------|
| A         | `a` must be unsigned                         | 
| B         | `b` must be unsigned                         | 
| ≌         | `a` & `b` must have the same signedness      | 
| ≥         | `a` must have same or larger type than `b`   | 

List of Solidity operations supported:
| Method           | In-place method  | Solidity Equivalent | Restriction | In-place restriction |
|------------------|------------------|---------------------|-------------|----------------------|
| `a.add(b)`       | `a.iadd(b)`      | `a + b`             | ≌           | ≌, ≥                |
| `a.sub(b)`       | `a.isub(b)`      | `a - b`             | ≌           | ≌, ≥                |
| `a.mul(b)`       | `a.imul(b)`      | `a * b`             | ≌           | ≌, ≥                |
| `a.div(b)`       | `a.idiv(b)`      | `a / b`             | ≌           | ≌, ≥                |
| `a.mod(b)`       | `a.imod(b)`      | `a % b`             | ≌           | ≌, ≥                |
| `a.pow(b)`       |                  | `a ** b`            | B            |                     |
| `a.neg()`        |                  | `-a`                | A            |                     |
| `a.addmod(b, m)` |                  | `assembly { addmod(a, b, m) }` | ≌     |                 |
| `a.mulmod(b, m)` |                  | `assembly { mulmod(a, b, m) }` | ≌     |                 |
| `a.shln(b)`      | `a.ishln(b)`     | `a << b`            | B            | B                   |
| `a.shrn(b)`      | `a.ishrn(b)`     | `a >> b`            | B            | B                   |
| `a.and(b)`       | `a.iand(b)`      | `a & b`             | ≌           | ≌, ≥                |
| `a.or(b)`        | `a.ior(b)`       | `a \| b`            | ≌           | ≌, ≥                |
| `a.xor(b)`       | `a.ixor(b)`      | `a ^ b`             | ≌           | ≌, ≥                |
| `a.not()`        |                  | `~a`                |               |                    |
| `a.gt(b)`        |                  | `a > b`             | ≌            |                     |
| `a.lt(b)`        |                  | `a < b`             | ≌            |                     |
| `a.gte(b)`       |                  | `a >= b`            | ≌            |                     |
| `a.lte(b)`       |                  | `a <= b`            | ≌            |                     |
| `a.eq(b)`        |                  | `a == b`            | ≌            |                     |
| `a.neq(b)`       |                  | `a != b`            | ≌            |                     |

Note that for out-of-place arithmetic and bitwise operators, the output will always have the larger type among 
`a` and `b`. For example, `int112(0).add(int64(0))` will have type `Int112`.

The below comparison methods will return a `BaseNumber` class instead of boolean:
| Method           | Restriction |
|------------------|-------------|
| `a.gt_(b)`        | ≌           |
| `a.lt_(b)`        | ≌           |
| `a.gte_(b)`       | ≌           |
| `a.lte_(b)`       | ≌           |
| `a.eq_(b)`        | ≌           |
| `a.neq_(b)`       | ≌           |

Other supported functions:
| Method                     | Return type   | Description                                                      |
|----------------------------|---------------|------------------------------------------------------------------|
| `BaseNumber.max()`         | `BaseNumber`  | Returns the maximum representable value of this class.           |
| `BaseNumber.min()`         | `BaseNumber`  | Returns the minimum representable value of this class.           |
| `a.clone()`                | `typeof a`    | Returns a clone of *a*.                                 |
| `a.as(btype)`              | `btype`       | Returns a new instance of type *btype* and the value of *a*.     |
| `a.like(b)`                | `typeof b`    | Returns a new instance of same type as *b* and the value of *a*. |
| `a.toString(base: number)` | `string`      | Returns the base-string and pad with zeroes.                     |

### Maximum and Minimum
For any type, e.g. `Uint256`, you can use `Uint256.min()` and `Uint256.max()` to access the minimum and maximum value representable by the type.
```typescript
import { Uint256 } from "solidity-math";

const a = Uint256.max(); // Uint256(115792089237316195423570985008687907853269984665640564039457584007913129639935)
```

### Overflow
Same as in Solidity, by default, all arithmetic operations are checked for overflow:
```typescript
import { Uint256 } from "solidity-math";

const a = Uint256.max();
a.add(1); // RangeError: Value overflow: Uint256(115792089237316195423570985008687907853269984665640564039457584007913129639936)
```

### Unchecked Mode
You can replicate Solidity's [unchecked](https://docs.soliditylang.org/en/v0.8.17/control-structures.html#unchecked) behaviour. 
Simply put your calculations as a callback function inside `unchecked()`:
```solidity
// Solidity code
uint256 a;
unchecked {
    a = type(uint256).max + 1; // 0
}
```

```typescript
// Typescript equivalent
import { Uint256, uint256, unchecked } from "solidity-math";

let a = uint256(0);
unchecked(() => {
    a = Uint256.max().add(1); // Uint256(0)
})
```

You can also directly access the return value of your callback function:
```typescript
import { Uint256, unchecked } from "solidity-math";

const a = unchecked(() => Uint256.max().add(1)); // Uint256(0)
```

For the purpose of this package, you should also perform Solidity inline assembly `assembly { ... }` 
in `unchecked` mode.

### Casting
Casting between unsigned & signed types are not allowed.
```typescript
const a = uint256(10);

// Cast a to type Uint64
const b = a.as(Uint64);
console.log(b); // Uint64(10)

// Cast b to same type as a
const c = b.like(a);
console.log(c); // Uint256(10)
```

## Example

### Muldiv
[muldiv](https://xn--2-umb.com/21/muldiv/index.html) is an algorithm that calculates `floor(a * b / denominator)`.
It is also included in [Uniswap V3 FullMath.sol](https://github.com/Uniswap/v3-core/blob/412d9b236a1e75a98568d49b1aeb21e3a1430544/contracts/libraries/FullMath.sol#L8).

Below is the Typescript equivalent function. Note that the original code is in Solidity <0.8.0, 
which allows `-uint256(denominator)`. To use this package, 
we need to perform `uint256(0).sub(denominator)` in unchecked mode.
```typescript
import { unchecked, uint256, Uint256 } from "solidity-math";

function muldiv(a: Uint256, b: Uint256, denominator: Uint256) {
    if (!denominator.gt(0)) {
        throw new Error;
    }

    const mm = unchecked(() => a.mulmod(b, Uint256.max()));
    let prod0 = a.mul(b);
    let prod1 = mm.sub(prod0).sub(a.lt_(b));

    if (prod1.eq(0)) {
        return prod0.div(denominator);
    }

    if (!prod1.lt(denominator)) {
        throw new Error;
    }

    const remainder = unchecked(() => a.mulmod(b, denominator));
    prod1 = prod1.sub(remainder.gt_(prod0));
    prod0 = prod0.sub(remainder);

    let twos = uint256(0);
    // -x for uint256 is disabled since 0.8.0
    // so we need unchecked mode
    unchecked(() => {
        twos = uint256(0).sub(denominator).and(denominator);
        denominator = denominator.div(twos);

        prod0 = prod0.div(twos);
        twos = uint256(0).sub(twos).div(twos).add(1);
    });

    prod0.ior(prod1.mul(twos));

    const inv = denominator.xor(2).mul(3);
    inv.imul(uint256(2).sub(denominator.mul(inv)));
    inv.imul(uint256(2).sub(denominator.mul(inv)));
    inv.imul(uint256(2).sub(denominator.mul(inv)));
    inv.imul(uint256(2).sub(denominator.mul(inv)));
    inv.imul(uint256(2).sub(denominator.mul(inv)));
    inv.imul(uint256(2).sub(denominator.mul(inv)));

    const result = prod0.mul(inv);
    return result;
}

const a = uint256(14718);
const b = uint256(13812);
const denominator = uint256(151231);

console.log(muldiv(a, b, denominator)); // Uint256(1344)
```
