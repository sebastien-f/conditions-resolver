import isFunction from "lodash.isfunction";
import { ICondition } from "./ICondition";

export abstract class Condition<T = any> implements ICondition {

	constructor(public path: string) {
        // More a safeguard than a hard rule
		if (!path || !path.trim || !path.trim().length) throw new Error("Path can't be null or empty");
	}

	public abstract isMet<T = any>(potato: T): boolean;

	protected getValueFromPotato(potato: T): any {
        // No object, no value. We return undefined as the target won't be resolved and thus is undefined
		if (potato === null || potato === undefined) return undefined;

        // We don't allow running against functions
        if(isFunction(potato)) throw new Error("Target can't be a function");

        // Key can be a simple variable name or a complex one towards a children like "foo.bar.xxx.yyy"
		const chunks = this.path.split('.');

        // We start on the base object
		let object:any = potato;

		do {
			// we process each "sub-object" key one by one
            const key = chunks.shift();

            // preemptive stop
            if(!key) return undefined;

            // Store the new reference in the old object
            object = object[key];

            // If any of the object has no value, we return the corresponding one
			if (object === undefined) {
				return undefined;
			}

			if (object === null) {
				return null;
			}
		}
		while (chunks.length);

		return object;
	}

}
