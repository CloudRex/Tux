import Collection from "./collection";

const fs = require("fs");

export default class EmojiCollection extends Collection {
	/**
	 * @param {Array<Object>} emojis
	 */
	constructor(emojis = []) {
		super(emojis);
	}

	/**
	 * @param {String} name
	 * @returns {String}
	 */
	get(name) {
		return this.find("name", name).id;
	}

	/**
	 * @param {String} path
	 * @returns {EmojiCollection}
	 */
	static async fromFile(path) {
		if (!fs.existsSync(path)) {
			throw new Error(`[EmojiCollection.fromFile] Path does not exist: ${path}`);
		}

		return new Promise((resolve) => {
			fs.readFile(path, (error, data) => {
				if (error) {
					throw error;
				}

				resolve(new EmojiCollection(JSON.parse(data.toString())));
			});
		});
	}
}
