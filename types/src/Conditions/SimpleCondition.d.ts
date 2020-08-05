import { Condition } from "./Condition";
declare class SimpleCondition extends Condition {
    private expression;
    private keyword;
    constructor(key: string, expression: any, keyword?: string);
    isMet(potato: any): boolean;
    private compile;
}
export { SimpleCondition };
