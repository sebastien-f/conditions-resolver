import { Command } from "./Command";
declare class LogicalCommand extends Command {
    operator: string;
    left: Command;
    right: Command;
    constructor(operator: string, left: Command, right: Command);
    execute(target: any): any;
}
export { LogicalCommand };
