const fs = require("fs");
const Typer = require("../typer");

export default class CommandLoader {
	/**
	 * @param {string} commandsPath
	 */
	constructor(commandsPath) {
		this.path = commandsPath;
	}

	/**
	 * @param {CommandManager} commandManager
	 */
	loadAll(commandManager) {
		fs.readdir(this.path, (error, files) => {
			files.forEach((file) => {
				// TODO: Path is hard coded
				// const module = require(path.join(this.path, path.basename(file, ".js")));
				const module = require(`../data/commands/${file}`).default;

				if (CommandLoader.validate(module)) {
					commandManager.register(module);
				}
			});
		});
	}

	/**
	 * @param {object} module
	 * @returns {boolean}
	 */
	static validate(module) {
		Typer.validate({
			executed: "function",
			canExecute: "function",
			meta: "object"
		}, module);
		
		Typer.validate({
			name: "string",
			description: "string",
			accessLevel: "number",
			aliases: "object",
			maxArguments: "number"
		}, module.meta);
		
		// TODO
		return true;
	}
}
