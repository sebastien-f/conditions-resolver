import { Token } from "./Token";
declare class Parser {
    private tokens;
    private current;
    constructor(tokens: Array<Token>);
    walk(): void;
}
export { Parser };
