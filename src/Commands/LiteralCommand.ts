import { Command } from "./Command";

class LiteralCommand extends Command {
    public constructor(public value: any, public raw: string) {
        super();
    }

    public execute(): any {
        return this.value;
    }
}


export { LiteralCommand }