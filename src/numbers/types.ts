import { BaseInteger, Input } from "./base";

interface Type<T extends BaseInteger> {
    min: T,
    max: T,
}

export function type<T extends BaseInteger>(_type: (number: Input) => T): Type<T> {
    const min = _type(0);
    min.bn = min._lbound.clone();
    const max = min._new(min._ubound);
    return { min, max };
}