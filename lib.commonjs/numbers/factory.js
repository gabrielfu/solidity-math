"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classFactory = void 0;
var base_1 = require("./base");
var Int = __importStar(require("./int"));
var Uint = __importStar(require("./uint"));
var classRegistry = new Map();
function classFactory(i) {
    var cls = classRegistry.get(i);
    if (cls == undefined) {
        throw new Error("Unrecognized class key ".concat(i));
    }
    return cls;
}
exports.classFactory = classFactory;
for (var _i = 0, _a = Object.values(Uint).concat(Object.values(Int)); _i < _a.length; _i++) {
    var cls = _a[_i];
    //@ts-ignore
    if (cls.prototype instanceof base_1.BaseNumber && cls._bitlen > 0) {
        //@ts-ignore
        classRegistry.set(cls._bitlen * (cls._signed ? -1 : 1), cls);
    }
}
