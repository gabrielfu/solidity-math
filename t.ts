// import { Int, Uint, BaseNumber, ConcreteNumberClass } from ".";
// // import * as Int from "./src/numbers/int";
// // import * as Uint from "./src/numbers/uint";

// const classRegistry: Map<number, ConcreteNumberClass> = new Map();

// function classFactory(i: number): ConcreteNumberClass {
//     const cls = classRegistry.get(i);
//     if (cls == undefined) {
//         throw new Error(`Unrecognized class key ${i}`);
//     }
//     return cls;
// }

// for (const cls of Object.values(Uint).concat(Object.values(Int))) {
//     //@ts-ignore
//     if (cls.prototype instanceof BaseNumber && cls._bitlen > 0) {
//         //@ts-ignore
//         classRegistry.set(cls._bitlen * (cls._signed ? -1 : 1), cls);
//     }
// }

// console.log(classRegistry);