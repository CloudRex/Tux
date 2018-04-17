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
			const ruleName = ruleKeys[ruleIdx];
			const orSplit = rules[ruleName].split("|");

			for (let orIdx = 0; orIdx < orSplit.length; orIdx++) {
				const rule = orSplit[orIdx];

				if (rule.startsWith("!")) {
					if (orSplit.length > 1) {
						throw new Error(`CommandArgumentParser: Having a required argument along with an OR operator is not allowed`);
					}
					else if (!args[ruleName]) {
						return false;
					}
				}

				if (args[ruleName]) {
					if (rule[0] === ":") {
						const type = rule.substring(1);

						if (!Object.keys(types).includes(type)) {
							throw new Error(`CommandArgumentParser: Custom argument type not registered: ${type}`);
						}

						if (!types[type](args[ruleName])) {
							if (orSplit.length === 1 || orIdx === orSplit.length - 1) {
								return false;
							}
						}
					}
					else if (!(typeof args[ruleName] === rule)) {
						if (orSplit.length === 1 || orIdx === orSplit.length - 1) {
							return false;
						}
					}
					else {
						return true;
					}
				}
			}
		}

		return true;
	}
}
