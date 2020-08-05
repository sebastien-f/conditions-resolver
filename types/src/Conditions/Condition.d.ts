import { ICondition } from "./ICondition";
export declare abstract class Condition<T = any> implements ICondition {
    path: string;
    constructor(path: string);
    abstract isMet<T = any>(potato: T): boolean;
    protected getValueFromPotato(potato: T): any;
}
