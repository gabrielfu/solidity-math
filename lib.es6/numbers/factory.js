import { BaseNumber } from "./base";
import * as Int from "./int";
import * as Uint from "./uint";
var classRegistry = new Map();
export function classFactory(i) {
    var cls = classRegistry.get(i);
    if (cls == undefined) {
        throw new Error("Unrecognized class key ".concat(i));
    }
    return cls;
}
for (var _i = 0, _a = Object.values(Uint).concat(Object.values(Int)); _i < _a.length; _i++) {
    var cls = _a[_i];
    //@ts-ignore
    if (cls.prototype instanceof BaseNumber && cls._bitlen > 0) {
        //@ts-ignore
        classRegistry.set(cls._bitlen * (cls._signed ? -1 : 1), cls);
    }
}
