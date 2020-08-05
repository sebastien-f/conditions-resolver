import { Command } from "./Command";
declare class UnaryExpressionCommand extends Command {
    operator: string;
    argument: Command;
    prefix: boolean;
    constructor(operator: string, argument: Command, prefix: boolean);
    execute(target: any): any;
}
export { UnaryExpressionCommand };
