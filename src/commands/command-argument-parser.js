export default class CommandArgumentParser {
	// TODO: Fully review, might contain bugs or be incomplete.
	/**
	 * @param {array<string>} rules
	 * @param {array<string>} args
	 * @param {object} types
	 * @returns {boolean}
	 */
	static validate(rules, args, types = {}) {
		const ruleKeys = Object.keys(rules);

		for (let ruleIdx = 0; ruleIdx < ruleKeys.length; ruleIdx++) {
			const ruleName = ruleKeys[ruleIdx]; // name:
			const rule = rules[ruleName];

			if (/^!?[a-zA-Z|_:]+$/.test(rule) === false) {
				throw new Error(`CommandArgumentParser.Validator: Invalid rule: ${rule}`);
			}

			const typeSplit = rules[ruleName].split("|"); // ["string", "number"]

			for (let typeIdx = 0; typeIdx < typeSplit.length; typeIdx++) {
				const type = typeSplit[typeIdx];

				console.log(`Checking ${ruleName}@${typeSplit[typeIdx]}`);

				if (type.startsWith("!")) {
					if (typeSplit.length > 1 && typeIdx > 0) {
						throw new Error(`CommandArgumentParser.Validator: Having a required argument along with an OR operator is not allowed`);
					}
					else if (!args[ruleName]) {
						console.log("Failed: Important not present.");

						return false;
					}
				}

				if (args[ruleName]) {
					if (type[0] === ":") {
						const actualType = type.substring(1);

						if (!Object.keys(types).includes(actualType)) {
							throw new Error(`CommandArgumentParser.Validator: Custom argument type not registered: ${actualType}`);
						}
						else if (types[actualType](args[ruleName])) {
							break;
						}
						else if (typeIdx === typeSplit.length - 1) {
							console.log("Failed: check on CUSTOM-type first or last item not passed");

							return false;
						}
					}
					else if (typeof args[ruleName] === (type[0] === "!" ? type.substring(1) : type)) {
						break;
					}
					else if (typeIdx === typeSplit.length - 1) {
						console.log("Failed: check on PRIMAL-type first or last item not passed");

						return false;
					}
				}
				else {
					break;
				}
			}
		}

		return true;
	}
}