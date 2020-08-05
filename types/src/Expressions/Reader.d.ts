import { Token } from "./Token";
declare class Reader {
    text: string;
    private length;
    private peek;
    private index;
    private getPeek;
    constructor(text: string);
    private next;
    readToken(): Token | null;
    private scanString;
    private unescape;
    private scanCharacter;
    private scanOperator;
    private readComplexOperator;
    private readNumber;
    private error;
    private readIdentifier;
    private isWhitespace;
    private isIdentifierStart;
    private isIdentifierPart;
    private isBetween;
    private isDigit;
    private isAscii;
    private isExponentStart;
    private isExponentSign;
}
export { Reader };
