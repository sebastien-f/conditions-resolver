import { Command } from "./Command";
declare class IdentifierCommand extends Command {
    name: string;
    constructor(name: string);
    execute(target: any): any;
}
export { IdentifierCommand };
