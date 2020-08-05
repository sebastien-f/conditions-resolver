import { Command } from "./Command";

class ExpressionStatementCommand extends Command {
    public constructor(public expression:Command) {
        super();
    }

    public execute(target:any): any {
        return this.expression.execute(target);
    }
}


export { ExpressionStatementCommand }