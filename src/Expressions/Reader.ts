import * as chars from "./Characters";
import { Token, TokenTypes } from "./Token";
/**
 * Greatly and vastly inspired (not to say "copied") by Angular
 */


const Keywords = ["null", "undefined", "true", "false"];

class Reader {
    private length: number;
    private peek: number = 0;
    private index: number = -1;

    private getPeek():number {
        return this.peek;
    }

    public constructor(public text: string) {
        this.length = text.length;
        this.next();
    }

    private next() {
        this.index++;
        this.peek = this.index >= this.length ? chars.EOF : this.text.charCodeAt(this.index);
    }

    public readToken(): Token | null {
        const { text, length } = this;
        let { peek, index } = this;

        while (peek <= chars.Space) {
            index++;
            if (index >= length) {
                peek = chars.EOF;
                break;
            }

            peek = text.charCodeAt(index);
        }

        this.peek = peek;
        this.index = index;

        if (index >= length) return null;

        if (this.isIdentifierStart(peek)) return this.readIdentifier();
        if (this.isDigit(peek)) return this.readNumber(index);

        const start: number = index;
        switch (peek) {
            case chars.Period:
                this.next();
                return this.isDigit(this.peek) ? this.readNumber(start) : new Token(start, this.index, TokenTypes.Character, String.fromCharCode(chars.Period), chars.Period);
            case chars.LeftParenthesis:
            case chars.RightParenthesis:
            case chars.LeftBrace:
            case chars.RightBrace:
            case chars.LeftBracket:
            case chars.RightBrace:
            case chars.Comma:
            case chars.Colon:
            case chars.SemiColon:
                return this.scanCharacter(start, peek);
            case chars.SingleQuote:
            case chars.DoubleQuote:
                return this.scanString();
            case chars.Hash:
            case chars.Plus:
            case chars.Minus:
            case chars.Star:
            case chars.Slash:
            case chars.Percent:
            case chars.Caret:
                return this.scanOperator(start, String.fromCharCode(peek));
            case chars.QuestionMark:
                return this.readComplexOperator(start, '?', chars.Period, '.');
            case chars.LowerThan:
            case chars.GreaterThan:
                return this.readComplexOperator(start, String.fromCharCode(peek), chars.Equal, '=');
            case chars.ExclamationPoint:
            case chars.Equal:
                return this.readComplexOperator(
                    start, String.fromCharCode(peek), chars.Equal, '=', chars.Equal, '=');
            case chars.Ampersand:
                return this.readComplexOperator(start, '&', chars.Ampersand, '&');
            case chars.Pipe:
                return this.readComplexOperator(start, '|', chars.Pipe, '|');
            case chars.Nbsp:
                while (this.isWhitespace(this.peek)) this.next();
                return this.readToken();
        }

        this.next();
        return this.error(`Unexpected character: '${String.fromCharCode(peek)}'`, 0);
    }

    private scanString(): Token {
        const start: number = this.index;
        const quote: number = this.peek;
        this.next();  // Skip initial quote.

        let buffer: string = "";
        let marker: number = this.index;
        const input: string = this.text;

        while (this.peek != quote) {
            if (this.peek == chars.Backslash) {
                buffer += input.substring(marker, this.index);
                this.next();
                let unescapedCode: number;
                if (this.getPeek() == chars.u) {
                    // 4 character hex code for unicode character.
                    const hex: string = input.substring(this.index + 1, this.index + 5);
                    if (/^[0-9a-f]+$/i.test(hex)) {
                        unescapedCode = parseInt(hex, 16);
                    } else {
                        return this.error(`Invalid unicode escape (\\u${hex})`, 0);
                    }
                    for (let i: number = 0; i < 5; i++) {
                        this.next();
                    }
                } else {
                    unescapedCode = this.unescape(this.peek);
                    this.next();
                }
                buffer += String.fromCharCode(unescapedCode);
                marker = this.index;
            } else if (this.peek == chars.EOF) {
                return this.error('Unterminated quote', 0);
            } else {
                this.next();
            }
        }

        const last: string = input.substring(marker, this.index);
        this.next();  // Skip terminating quote.

        return new Token(start, this.index, TokenTypes.String, buffer+last);
    }

    private unescape(code: number): number {
        switch (code) {
          case chars.n:
            return chars.LF;
          case chars.f:
            return chars.FormFeed;
          case chars.r:
            return chars.CR;
          case chars.t:
            return chars.Tab;
          case chars.v:
            return chars.VerticalTab;
          default:
            return code;
        }
      }


    private scanCharacter(start: number, code: number): Token {
        this.next();
        return new Token(start, this.index, TokenTypes.Character, String.fromCharCode(code), code);
    }

    private scanOperator(start: number, str: string): Token {
        this.next();
        return new Token(start, this.index, TokenTypes.Operator, str);
    }

    private readComplexOperator(start: number, one: string, twoCode: number, two: string, threeCode?: number, three?: string): Token {
        this.next();
        let str: string = one;
        if (this.peek == twoCode) {
            this.next();
            str += two;
        }
        if (threeCode != null && this.peek == threeCode) {
            this.next();
            str += three;
        }
        return new Token(start, this.index, TokenTypes.Operator, str);
    }

    private readNumber(start: number): Token {
        let isInteger: boolean = (this.index === start);
        // Skip initial digit. <= pourquoi ?
        this.next();
        while (true) {
            if (this.isDigit(this.peek)) {

            } else if (this.peek == chars.Period) {
                isInteger = false;
            } else if (this.isExponentStart(this.peek)) {
                this.next();
                if (this.isExponentSign(this.peek)) this.next();
                if (!this.isDigit(this.peek)) return this.error("Invalid exponent", -1);
                isInteger = false;
            } else {
                break;
            }
            this.next();
        }
        const str: string = this.text.substring(start, this.index);
        let result: number;

        if (isInteger) {
            result = parseInt(str);
            if (isNaN(result)) return this.error("Invalid Integer", -1);
        } else {
            result = parseFloat(str);
        }

        return new Token(start, this.index, TokenTypes.Number, str, result);
    }

    private error(message: string, offset: number): Token {
        const index: number = this.index + offset;
        const start = this.index <= 5 ? 0 : 5;
        const end = this.index >= this.length + 5 ? this.length - this.index : 5;
        const extract = this.text.substring(start, end);
        return new Token(index, this.index, TokenTypes.Error, `Lexer Error : ${message}, index ${index} (${extract}) in ${this.text}`);
    }

    private readIdentifier(): Token {
        const start: number = this.index;
        this.next();
        while (this.isIdentifierPart(this.peek)) this.next();
        const identifier: string = this.text.substring(start, this.index);
        const tokenType = Keywords.includes(identifier) ? TokenTypes.Keyword : TokenTypes.Identifier;

        return new Token(start, this.index, tokenType, identifier);
    }

    private isWhitespace(code: number): boolean {
        return this.isBetween(code, chars.Tab, chars.Space) || (code == chars.Nbsp);
    }

    private isIdentifierStart(code: number): boolean {
        // In JavaScript, identifiers are case-sensitive and can contain Unicode letters, $, _, and digits (0-9), but may not start with a digit.
        // src: https://developer.mozilla.org/en-US/docs/Glossary/Identifier
        // As we have much more to do than handle extensive unicode cases, we limit the options the [a-zA-Z] and that's gonna be fine for now
        return this.isAscii(code)
            || (code == chars._)
            || (code == chars.$)
            ;
    }

    private isIdentifierPart(code: number): boolean {
        // In JavaScript, identifiers are case-sensitive and can contain Unicode letters, $, _, and digits (0-9)
        // src: https://developer.mozilla.org/en-US/docs/Glossary/Identifier
        // As we have much more to do than handle extensive unicode cases, we limit the options the [a-zA-Z] and that's gonna be fine for now
        return this.isAscii(code)
            || this.isDigit(code)
            || (code == chars._)
            || (code == chars.$)
            ;
    }

    private isBetween(what: number, lower: number, higher: number): boolean {
        return lower <= what && what <= higher;
    }

    private isDigit(code: number): boolean {
        return chars.Zero <= code && code <= chars.Nine;
    }

    private isAscii(code: number): boolean {
        return this.isBetween(code, chars.a, chars.z)
            || this.isBetween(code, chars.A, chars.Z);
    }

    private isExponentStart(code: number): boolean {
        return code == chars.e || code == chars.E;
    }

    private isExponentSign(code: number): boolean {
        return code == chars.Minus || code == chars.Plus;
    }
}

export { Reader }