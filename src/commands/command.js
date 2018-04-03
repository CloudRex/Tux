export default class Command {
	/**
	 * @param {string} base
	 * @param {string} description
	 * @param {array<string>} aliases
	 * @param {(string|null)} extendedDescription
	 * @param {number} maxArguments
	 * @param {AccessLevelType} accessLevel
	 * @param {function} onExecuted
	 * @param {function} canExecute
	 */
	constructor(base, description, aliases, extendedDescription, maxArguments, accessLevel, onExecuted, canExecute) {
		this.base = base;
		this.description = description;
		this.aliases = aliases;
		this.extendedDescription = extendedDescription !== null ? extendedDescription : description;
		this.maxArguments = maxArguments;
		this.accessLevel = accessLevel;
		this.executed = onExecuted;
		this.canExecute = canExecute;
	}
}
