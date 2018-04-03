export default class CommandManager {
	constructor() {
		this.commands = [];
	}

	/**
	 * @param {Command} command
	 */
	register(command) {
		this.commands.push(command);
	}

	/**
	 * @param {array<Command>} commands
	 */
	registerMultiple(commands) {
		for (let i = 0; i < commands.length; i++) {
			this.register(commands[i]);
		}
	}

	/**
	 * @param {string} commandBase
	 * @returns {boolean}
	 */
	isRegistered(commandBase) {
		return this.getByBase(commandBase) != null;
	}

	/**
	 * @param {string} commandBase
	 * @returns {(Command|null)}
	 */
	getByBase(commandBase) {
		for (let i = 0; i < this.commands.length; i++) {
			if (this.commands[i].base === commandBase || this.commands[i].aliases.includes(commandBase)) {
				return this.commands[i];
			}
		}

		return null;
	}

	// TODO: Move to the corresponding file/class
	/**
	 * @param {*} message
	 * @param {string} role
	 * @returns {*}
	 */
	hasRole(message, role) {
		return message.member.roles.find("name", role);
	}

	/**
	 * @param {*} message
	 * @param {array<string>} roles
	 * @returns {boolean}
	 */
	hasRoles(message, roles) {
		for (let i = 0; i < roles.length; i++) {
			if (!this.hasRole(message, roles[i])) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @param {CommandExecutionContext} context
	 * @param {Command} command
	 * @returns {Promise<boolean>}
	 */
	async handle(context, command) {
		if (command.requiredRoles.length > 0 && !context.message.member) {
			context.message.channel.send("You can't use that command here. Sorry!");

			return false;
		}

		if (command.canExecute(context) && context.arguments.length <= command.maxArguments && this.hasRoles(context.message, command.requiredRoles)) {
			command.executed(context);

			return true;
		}
		else {
			const message = await context.respond("You can't do that. Sorry!");

			message.message.delete(3000);
		}


		return false;
	}
}
