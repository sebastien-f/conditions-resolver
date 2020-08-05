declare enum TokenTypes {
    Character = 0,
    Identifier = 1,
    Keyword = 2,
    String = 3,
    Operator = 4,
    Number = 5,
    Error = 6
}
declare class Token {
    index: number;
    end: number;
    type: TokenTypes;
    value: string;
    numericValue: number;
    constructor(index: number, end: number, type: TokenTypes, value: string, numericValue?: number);
}
export { TokenTypes, Token };
