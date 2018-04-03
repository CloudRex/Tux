export default class Command {
	/**
	 * @param {string} base
	 * @param {string} description
	 * @param {array<string>} aliases
	 * @param {string} extendedDescription
	 * @param {number} maxArguments
	 * @param {array<string>} requiredRoles
	 */
	constructor(base, description, aliases, extendedDescription, maxArguments, requiredRoles) {
		this.base = base;
		this.description = description;
		this.aliases = aliases;
		this.extendedDescription = extendedDescription ? extendedDescription : description;
		this.maxArguments = maxArguments;
		this.requiredRoles = requiredRoles;
	}
}
