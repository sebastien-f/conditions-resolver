import { Command } from "./Command";
declare class ExpressionStatementCommand extends Command {
    expression: Command;
    constructor(expression: Command);
    execute(target: any): any;
}
export { ExpressionStatementCommand };
