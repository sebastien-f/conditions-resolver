import { Command } from "./Command";

class ProgramCommand extends Command {
    public constructor(public program:Command) {
        super();
    }

    public execute(target:any): any {
        return this.program.execute(target);
    }
}


export { ProgramCommand }