const fs = require("fs");

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
		// TODO
		// return module.meta !== null && typeof module.meta === "object";
		return true;
	}
}
