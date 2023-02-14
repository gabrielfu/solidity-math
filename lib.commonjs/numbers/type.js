"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = void 0;
function type(_type) {
    var min = _type(0);
    min.bn = min._lbound.clone();
    var max = min._new(min._ubound);
    return { min: min, max: max };
}
exports.type = type;
