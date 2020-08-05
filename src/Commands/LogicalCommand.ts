import { Command } from "./Command";

class LogicalCommand extends Command {
    public constructor(public operator: string, public left: Command, public right: Command) {
        super()
    }

    public execute(target: any): any {
        switch (this.operator) {
            case "&&":
                return this.left.execute(target) && this.right.execute(target);
            case "||":
                return this.left.execute(target) || this.right.execute(target);
            default:
                throw new Error(`Unsupported operator: "${this.operator}"`);
        }
    }
}

export { LogicalCommand }