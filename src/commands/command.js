export default class Command {
	/**
	 * @param {string} base
	 * @param {string} description
	 * @param {array<string>} aliases
	 * @param {string} extendedDescription
	 * @param {number} maxArguments
	 * @param {array<string>} requiredRoles
	 * @param {function} onExecuted
	 * @param {function} canExecute
	 */
	constructor(base, description, aliases, extendedDescription, maxArguments, requiredRoles, onExecuted, canExecute) {
		this.base = base;
		this.description = description;
		this.aliases = aliases;
		this.extendedDescription = extendedDescription !== null ? extendedDescription : description;
		this.maxArguments = maxArguments;
		this.requiredRoles = requiredRoles;
		this.executed = onExecuted;
		this.canExecute = canExecute;
	}
}
