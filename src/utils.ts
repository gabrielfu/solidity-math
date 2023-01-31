export function checkSameType(a: any, b: any, opname: string) {
    let atype = a.constructor.name;
    let btype = b.constructor.name;
    if (atype != btype) {
        throw new TypeError(
            `Cannot perform ${opname} operation on ${atype} and ${btype}`
        );
    }
}

/** @description create a new empty instance of the same class as obj */
export function createNewInstance<T extends Object>(obj: T): T {
    return new (obj.constructor as new() => T)();
}