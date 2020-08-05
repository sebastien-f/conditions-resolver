import { Command } from "./Command";
declare class LiteralCommand extends Command {
    value: any;
    raw: string;
    constructor(value: any, raw: string);
    execute(): any;
}
export { LiteralCommand };
