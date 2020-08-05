
enum TokenTypes {
    Character,
    Identifier,
    Keyword,
    String,
    Operator,
    Number,
    Error
}

class Token {

    constructor(
        public index: number, public end: number,
        public type: TokenTypes, public value: string,
        public numericValue: number = 0,
    ) { }
}

export { TokenTypes, Token }