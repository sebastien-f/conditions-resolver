import { Command } from "./Command";

class IdentifierCommand extends Command {
    public constructor(public name: string) {
        super();
    }

    public execute(target: any): any {
        return target[this.name];
    }
}
export { IdentifierCommand }