import { Command } from "./Command";

class UnaryExpressionCommand extends Command {
    public constructor(public operator: string, public argument: Command, public prefix: boolean) {
        super();
    }

    public execute(target: any): any {
        switch (this.operator) {
            case "!":
                if (!this.prefix) throw new Error(`${this.operator} must be the prefix of the next statement`);
                return !this.argument.execute(target);
            case "+":
                if (!this.prefix) throw new Error(`${this.operator} must be the prefix of the next statement`);
                return +this.argument.execute(target);
            case "-":
                if (!this.prefix) throw new Error(`${this.operator} must be the prefix of the next statement`);
                return -this.argument.execute(target);
            default:
                throw new Error(`Unsupported operator: "${this.operator}"`);
        }
    }
}

export { UnaryExpressionCommand }