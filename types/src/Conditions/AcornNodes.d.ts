interface ProgramNode {
    type: "Program";
    body: Array<any>;
}
interface ExpressionStatementNode {
    type: "ExpressionStatement";
    expression: AcornNodes;
}
interface UnaryExpression {
    type: "UnaryExpression";
    operator: string;
    argument: AcornNodes;
    prefix: boolean;
}
interface BinaryExpression {
    type: "BinaryExpression";
    left: AcornNodes;
    operator: string;
    right: AcornNodes;
}
interface Literal {
    type: "Literal";
    value: any;
    raw: string;
}
interface LogicalExpression {
    type: "LogicalExpression";
    left: AcornNodes;
    operator: string;
    right: AcornNodes;
}
interface Identifier {
    type: "Identifier";
    name: string;
}
interface CallExpression {
    type: "CallExpression";
}
export declare type AcornNodes = ProgramNode | ExpressionStatementNode | UnaryExpression | Identifier | BinaryExpression | Literal | LogicalExpression | CallExpression;
export {};
