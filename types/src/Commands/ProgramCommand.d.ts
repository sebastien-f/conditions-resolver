import { Command } from "./Command";
declare class ProgramCommand extends Command {
    program: Command;
    constructor(program: Command);
    execute(target: any): any;
}
export { ProgramCommand };
