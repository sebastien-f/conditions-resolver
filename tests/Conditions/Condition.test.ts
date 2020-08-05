import { Condition } from '../../src/Conditions/Condition';

class MockCondition extends Condition {

    public isMet(potato: any): boolean {
		return true;
    }

	public getValueFromPotatoProxy(potato: any):any {
		return this.getValueFromPotato(potato);
	}
}

describe('Condition', () => {

	it("should have a public key property properly set", () => {
		let key = "foo.bar-654qsd%.µ\[]S42é_!()";
		let cond = new MockCondition(key);

		expect(cond.path).toBe(key);
	});

	describe(".getValueFromPotato()", () => {
		it("should get undefined if the target object is null", () => {
			let cond = new MockCondition("foo");
			let value = cond.getValueFromPotatoProxy(null);
			expect(value).toBeUndefined();
		});

		it("should get undefined if the target object is undefined", () => {
			let cond = new MockCondition("foo");
			let value = cond.getValueFromPotatoProxy(undefined);
			expect(value).toBeUndefined();
		});


		it("should get undefined if the property don't exists", () => {
			let cond = new MockCondition("foo");
			let value = cond.getValueFromPotatoProxy({});
			expect(value).toBeUndefined();
		});

		it('should get the proper value of a root number property', () => {
            // positive number
			let potato:any = { "foo": 42 }
			let key = "foo";
			let value = potato[key];
			let cond = new MockCondition(key);
			let expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);

            // 0
			potato[key] = 0;
			value = potato[key];
			expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);

            // negative number
			potato[key] = -1;
			value = potato[key];
			expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);
		});

		it('should get the proper value of a root string property', () => {
			let potato:any = { "foo": "42" }
			let key = "foo";
			let value = potato[key];
			let cond = new MockCondition(key);
			let expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);
		});

		it('should get the proper value of a root boolean property', () => {
            // false
			let potato:any = { "foo": false }
			let key = "foo";
			let value = potato[key];
			let cond = new MockCondition(key);
			let expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);

            // true
			potato[key] = true;
			value = potato[key];
			expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);
		});

		it('should get the proper value of a sub property', () => {
			let potato = {
				"foo": {
					"bar": {
						"buzz": "xxx"
					}
				}
			}
			let key = "foo.bar.buzz";
			let value = "xxx";
			let cond = new MockCondition(key);
			let expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBe(value);
		});

		it('should return undefined for of a sub property missing', () => {
			let potato = {
				"foo": {}
			};

			let key = "foo.bar.buzzz";
			let cond = new MockCondition(key);
			let expectedValue = cond.getValueFromPotatoProxy(potato);
			expect(expectedValue).toBeUndefined();
		});

		it('should return the proper value for an array', () => {
			let potato = {
				"array": [42, "foo", false]
			};

			let cond = new MockCondition("array.0");
			expect(cond.getValueFromPotatoProxy(potato)).toBe(42);

			cond = new MockCondition("array.1");
			expect(cond.getValueFromPotatoProxy(potato)).toBe("foo");

			cond = new MockCondition("array.2");
			expect(cond.getValueFromPotatoProxy(potato)).toBe(false);
		});

		it('should return undefined for a missing index in array', () => {
			let potato:any = {
				array: []
			};

			potato.array[1] = "foo";
			potato.array[2] = false;

			let cond = new MockCondition("array.0");
			expect(cond.getValueFromPotatoProxy(potato)).toBeUndefined();

			cond = new MockCondition("array.1");
			expect(cond.getValueFromPotatoProxy(potato)).toBe("foo");

			cond = new MockCondition("array.2");
			expect(cond.getValueFromPotatoProxy(potato)).toBe(false);
		});


	});
});
