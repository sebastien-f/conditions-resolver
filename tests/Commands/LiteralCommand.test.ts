import { LiteralCommand } from "../../src/Commands/LiteralCommand";


describe('Condition', () => {

    it("should have a public value property properly set", () => {
		let p = 42;
		let cmd = new LiteralCommand(p, p.toString());

		expect(cmd.value).toBe(p);
	});

	it("should have a public raw property properly set", () => {
		let p = 42;
		let cmd = new LiteralCommand(-1, p.toString());

        expect(cmd.raw).toBe("42");
	});


	describe(".execute()", () => {
        it('should exists', () => {
            let cmd = new LiteralCommand(42, "42");

            expect(cmd.execute).toBeDefined();
            expect(typeof cmd.execute).toBe("function");
        });

		it("should return null if null was passed as a value", () => {
			let cmd = new LiteralCommand(null, "null");
			let value = cmd.execute();
			expect(value).toBeNull;
		});

		it("should return undefined if undefined was passed as a value", () => {
			let cmd = new LiteralCommand(undefined, "undefined");
			let value = cmd.execute();
			expect(value).toBeUndefined();
        });

        it('should return the appropriate value', () => {
            let cmd = new LiteralCommand(42, "42");
            let value = cmd.execute();
            expect(value).toBe(42);
        });

	});
});
