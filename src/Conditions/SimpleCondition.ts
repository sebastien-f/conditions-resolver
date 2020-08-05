// default import don't work for acorn
import * as acorn from "acorn";
import { AcornNodes } from "./AcornNodes";
import { Condition } from "./Condition";
import * as Commands from "../Commands";

class SimpleCondition extends Condition {
    constructor(key: string, private expression: any, private keyword:string = "value") {
        super(key);

        if (expression == null || typeof expression !== 'string') throw new Error("expression should be a string");
        if (!expression.length) throw new Error("expression can't be an empty string");
        if (expression.indexOf(this.keyword) < 0) throw new Error(`expression must contain the keyword '${keyword}' (${expression})`);
    }

    public isMet(potato: any): boolean {
        // sans objet, la condition ne peut être remplie
        if (!potato) return false;

        const currentValue = this.getValueFromPotato(potato);

        const x = acorn.parse(this.expression);

        // Types from acorn are not typescript's BFF
        // cf https://github.com/acornjs/acorn/issues/741
        // so we switch to some custom types to handle in a way that please TS.
        const y = this.compile(x as any as AcornNodes);

        const target:any = {};
        target[this.keyword] = currentValue;
        //const producedValue = y.execute({ value: currentValue });
        const producedValue = y.execute(target);
        if (producedValue !== true && producedValue !== false) throw new Error(`Expression MUST produce a boolean result (got "${producedValue}")`);

        return producedValue;
    }

    private compile(node: AcornNodes): any {
        // Each node will produce a specific Command object that knows how to deal with
        // what it receive
        switch (node.type) {
            case "Program":
                if (!node.body) throw new Error("Program Node should have a body");

                // For now, we limit that to one, but there might be use cases for more
                if (node.body.length > 1) throw new Error("Program body should be made of a single statement");

                return new Commands.ProgramCommand(this.compile(node.body[0]));

            case "ExpressionStatement":
                if (!node.expression) throw new Error(`${node.type} should have an expression`);

                return new Commands.ExpressionStatementCommand(this.compile(node.expression));

            case "UnaryExpression":
                if (!node.argument) throw new Error(`${node.type} should have an argument`);
                if (!node.operator) throw new Error(`${node.type} should have an operator`);

                return new Commands.UnaryExpressionCommand(node.operator, this.compile(node.argument), node.prefix)

            case "BinaryExpression":
                if (!node.left) throw new Error(`${node.type} should have a left node`);
                if (!node.right) throw new Error(`${node.type} should have a right node`);
                if (!node.operator) throw new Error(`${node.type} should have an operator argument`);

                return new Commands.BinaryCommand(node.operator, this.compile(node.left), this.compile(node.right));

            case "LogicalExpression":
                if (!node.left) throw new Error(`${node.type} should have a left node`);
                if (!node.right) throw new Error(`${node.type} should have a right node`);
                if (!node.operator) throw new Error(`${node.type} should have an operator argument`);

                return new Commands.LogicalCommand(node.operator, this.compile(node.left), this.compile(node.right));

            case "Identifier":
                if (!node.name) throw new Error(`${node.type} should have a name`);

                return new Commands.IdentifierCommand(node.name);

            case "Literal":
                return new Commands.LiteralCommand(node.value, node.raw);

            case "CallExpression":
                throw new Error(`Node ${node.type} is disallowed`)

            default:
                throw new Error(`Node ${(node as any).type} is unknow or unsupported`);
        }
    }
}

export { SimpleCondition }