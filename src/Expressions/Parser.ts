import { Token, TokenTypes } from "./Token";

class Parser {
    private current = 0;

    public constructor(private tokens:Array<Token>) {

    }

    public walk() {
        let token = this.tokens[this.current];

    }
}

export { Parser }