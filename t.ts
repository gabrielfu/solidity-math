import SM from ".";

const a = SM.uint104(5);
console.log(a);

const b = a.add(a);
console.log(b);

const c = a.add(SM.uint256(1));
console.log(c);

const d = a.add(SM.uint16(1));
console.log(d);

console.log(SM.Uint256.max());