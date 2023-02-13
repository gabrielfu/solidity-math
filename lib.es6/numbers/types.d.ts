import { BaseInteger, Input } from "./base";
interface Type<T extends BaseInteger> {
    min: T;
    max: T;
}
export declare function type<T extends BaseInteger>(_type: (number: Input) => T): Type<T>;
export {};
