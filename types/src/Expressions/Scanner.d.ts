/**
 * Greatly and vastly inspired (not to say "copied") by Angular
 */
declare class Token {
    index: number;
    end: number;
    type: TokenType;
    value: string;
    numericValue: number;
    constructor(index: number, end: number, type: TokenType, value: string, numericValue?: number);
}
declare enum TokenType {
    Character = 0,
    Identifier = 1,
    Keyword = 2,
    String = 3,
    Operator = 4,
    Number = 5,
    Error = 6
}
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
export { Reader as Scanner };
