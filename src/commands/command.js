export default class Command {
    constructor(base, description, aliases, extendedDescription, maxArguments, requiredRoles) {
        this.base = base;
        this.description = description;
        this.aliases = aliases;
        this.extendedDescription = extendedDescription;
        this.maxArguments = maxArguments;
        this.requiredRoles = requiredRoles;
    }
}
