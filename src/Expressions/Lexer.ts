import { Token } from "./Token";
import { Reader } from "./Reader";

class Lexer {
    tokenize(text: string): Token[] {
        const reader = new Reader(text);
        const tokens: Token[] = [];
        let token = reader.readToken();
        while (token != null) {
          tokens.push(token);
          token = reader.readToken();
        }
        return tokens;
      }
}

export { Lexer }