import { Command } from "./Command";
declare class BinaryCommand extends Command {
    operator: string;
    left: Command;
    right: Command;
    constructor(operator: string, left: Command, right: Command);
    execute(target: any): any;
}
export { BinaryCommand };
