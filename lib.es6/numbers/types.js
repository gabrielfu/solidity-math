export function type(_type) {
    var min = _type(0);
    min.bn = min._lbound.clone();
    var max = min._new(min._ubound);
    return { min: min, max: max };
}
