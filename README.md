# solidity-math
[![npm version](https://badge.fury.io/js/solidity-math.svg)](https://badge.fury.io/js/solidity-math)

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
* [Motivation](#motivation)
  + [Comprehensive integer sizes](#comprehensive-integer-sizes)
  + [Unchecked arithmetic](#unchecked-arithmetic)
  + [Right shift operator](#right-shift-operator)
  + [Bitwise operators](#bitwise-operators)
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
```shell
npm i solidity-math
```

## Usage
Named import:
```typescript
import { uint256, uint128, type, unchecked } from "solidity-math";

const a = uint256(10);
const b = uint128(20);

console.log(a.add(b)); // uint256(30)
console.log(a.add(20)); // uint256(30)
console.log(a.add("20")); // uint256(30)
console.log(a.lte(0)); // false

unchecked(() => {
    const c = type(uint256).max.add(1).add(a);
    console.log(a.eq(c)); // true
});

const c = type(uint256).max.add(1).add(a); // RangeError: Value overflow: uint256(115792089237316195423570985008687907853269984665640564039457584007913129639946)
```

Default import:
```typescript
import SM from "solidity-math";

const a = SM.uint256(10);
const b = SM.uint128(20);
const c = SM.unchecked(() => SM.type(SM.uint256).max.add(11));
```

## Motivation
Certain decentralized applications require external actors to regulraly interact with on-chain contracts to ensure normal operations. DEXs like Uniswap rely on [arbitrageurs](https://github.com/gabrielfu/amm-arbitrage) and [JIT LP](https://uniswap.org/blog/jit-liquidity) to maintain market prices. Jobs on [Keep3r Network](https://keep3r.network/) will only be executed if they are profitable. These external actors need to pre-compute the rewards of their work, often in a very short amount of time to compete with other actors. It is infeasible to do all calculations on a smart contract as the connection overhead will be too slow. This package is an excellent tool to perform such calculations.

### Comprehensive integer sizes
Packages like [fixed-bn](https://github.com/ethereumjs/fixed-bn.js/) and [uint256](https://github.com/artit91/uint256) 
offer either only uint256 or limited integer sizes. This package provides all integer sizes suppported by Solidity.

### Unchecked arithmetic
To the best of the author's knowledge, there is no Javascript package that allows users to 
toggle on and off `unchecked { ... }` mode. This package does it in the closest possible syntax.

### Right shift operator
Solidity's [right shift operator](https://docs.soliditylang.org/en/v0.8.17/types.html#shifts) (*after v0.5.0*) has
a different implementation than bn.js.
> x >> y is equivalent to the mathematical expression x / 2**y, rounded towards negative infinity.

For example, in Solidity, `-204812 >> 10 == -201`, 
whereas in bn.js, `(new BN(-204812)).ushrn(10)` returns `-200`, i.e., rounded **towards zero**.

### Bitwise operators
To replicate Solidity `x & y` in bn.js, one must explicity convert to two's complement representation
and do the verbose `x.toTwos(256).uand(y.toTwos(256)).fromTwos(256)`.


## Documentation

### Types
*Note 1: `uint` & `int` aliases are not implemented as they are redundant and confusing.*

*Note 2: Fixed point numbers are not implemented because it's not fully supported by Solidity yet as of 0.8.17.*

| Unsigned   | Signed   |
|------------|----------|
| `uint8`    | `int8`   |
| `uint16`   | `int16`  |
| `uint24`   | `int24`  |
| `uint32`   | `int32`  |
| `uint40`   | `int40`  |
| `uint48`   | `int48`  |
| `uint56`   | `int56`  |
| `uint64`   | `int64`  |
| `uint72`   | `int72`  |
| `uint80`   | `int80`  |
| `uint88`   | `int88`  |
| `uint96`   | `int96`  |
| `uint104`  | `int104` |
| `uint112`  | `int112` |
| `uint120`  | `int120` |
| `uint128`  | `int128` |
| `uint136`  | `int136` |
| `uint144`  | `int144` |
| `uint152`  | `int152` |
| `uint160`  | `int160` |
| `uint168`  | `int168` |
| `uint176`  | `int176` |
| `uint184`  | `int184` |
| `uint192`  | `int192` |
| `uint200`  | `int200` |
| `uint208`  | `int208` |
| `uint216`  | `int216` |
| `uint224`  | `int224` |
| `uint232`  | `int232` |
| `uint240`  | `int240` |
| `uint248`  | `int248` |
| `uint256`  | `int256` |

The base class of all classes is an abstract class `BaseInteger`. 
All unsigned integers are of a single subclass `Uint`, and all signed integers `Int`.

These "types" are not Javascript classes, but merely functions to create new Solidity numbers.

### Operations
There are restrictions on the types of operands, as enforced by Solidity.
```typescript
uint256(1).add(uint256(2)); // valid
uint256(1).add(int256(2)); // TypeError: Operator "add" not compatible with types uint256 and int256. 
uint64(1).iadd(uint256(2)) // TypeError: Operator "iadd" not compatible with uint64 and a larger type uint256
int256(1).pow(int256(-1)); // TypeError: Operator "pow" not compatible with signed type int256
uint256(-1); // RangeError: Value overflow: uint256(-1)
```

The right operand can also be a regular JS number, string, or another BN.
However, it must fit into the range of left operand type,
and must stay compliant of Solidity restrictions.
```typescript
uint256(1).add(2); // uint256(3)
uint256(1).add("3"); // uint256(4)
uint256(1).add(new BN(4)); // uint256(5)

uint256(1).add(-1); // TypeError: Right operand -1 does not fit into type uint256
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
`a` and `b`. For example, `int112(0).add(int64(0))` will have type `int112`.

The below comparison methods will return an `Uint` or `Int` instance (either `1` or `0`), depending on `a`, instead of boolean:
| Method           | Restriction |
|------------------|-------------|
| `a.gt_(b)`       | ≌           |
| `a.lt_(b)`       | ≌           |
| `a.gte_(b)`      | ≌           |
| `a.lte_(b)`      | ≌           |
| `a.eq_(b)`       | ≌           |
| `a.neq_(b)`      | ≌           |

```typescript
uint256(10).gt(uint256(2)); // true
uint256(10).gt(uint256(20)); // false

uint256(10).gt_(uint256(2)); // uint256(1)
uint256(10).gt_(uint256(20)); // uint256(0)
```

Other supported functions:
| Method                     | Return type   | Description                                                      |
|----------------------------|---------------|------------------------------------------------------------------|
| `a.clone()`                | `typeof a`    | Returns a clone of *a*.                                          |
| `a.cast(_type)`            | `_type`       | Returns a new instance of type *_type* and the value of *a*.     |
| `a.like(b)`                | `typeof b`    | Returns a new instance of same type as *b* and the value of *a*. |
| `a.toString(base: number)` | `string`      | Returns the base-string and pad with zeroes.                     |

### Maximum and Minimum
For any type, e.g. `uint256`, you can use `type(uint256).min` and `type(uint256).max` to access the minimum and maximum value representable by the type.
```typescript
import { uint256, type } from "solidity-math";

const a = type(uint256).max; // uint256(115792089237316195423570985008687907853269984665640564039457584007913129639935)
```

### Overflow
Same as in Solidity, by default, all arithmetic operations are checked for overflow:
```typescript
import { uint256, type } from "solidity-math";

const a = type(uint256).max;
a.add(1); // RangeError: Value overflow: uint256(115792089237316195423570985008687907853269984665640564039457584007913129639936)
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
import { uint256, type, unchecked } from "solidity-math";

let a = uint256(0);
unchecked(() => {
    a = type(uint256).max.add(1); // uint256(0)
})
```

You can also directly access the return value of your callback function:
```typescript
import { uint256, type, unchecked } from "solidity-math";

const a = unchecked(() => type(uint256).max.add(1)); // uint256(0)
```

For the purpose of this package, you should also perform Solidity inline assembly `assembly { ... }` 
in `unchecked` mode.

### Casting
Casting between unsigned & signed types are not allowed.
```typescript
const a = uint256(10);

// Cast a to type uint64
const b = a.cast(uint64);
const c = uint64(a);

// Cast a to same type as b
const d = a.like(b);
```

## Example

### Muldiv
[muldiv](https://xn--2-umb.com/21/muldiv/index.html) is an algorithm that calculates `floor(a * b / denominator)`.
It is also included in [Uniswap V3 FullMath.sol](https://github.com/Uniswap/v3-core/blob/412d9b236a1e75a98568d49b1aeb21e3a1430544/contracts/libraries/FullMath.sol#L8).

Below is the Typescript equivalent function. Note that the original code is in Solidity <0.8.0, 
which allows `-uint256(denominator)`. To use this package, 
we need to perform `uint256(0).sub(denominator)` in unchecked mode.
```typescript
import { unchecked, uint256, Uint, type } from "solidity-math";

function muldiv(a: Uint, b: Uint, denominator: Uint) {
    if (!denominator.gt(0)) {
        throw new Error;
    }

    const mm = unchecked(() => a.mulmod(b, type(uint256).max));
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

console.log(muldiv(a, b, denominator)); // uint256(1344)
```
