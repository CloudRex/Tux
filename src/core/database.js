import Log from "./log";

const fs = require("fs");

export default class Database {
	/**
	 * @param {string} path
	 */
	constructor(path) {
		this.path = path;

		if (!fs.existsSync(path)) {
			Log.error("[Database] Invalid database file path");
		}

		this.db = require("knex")({
			client: "sqlite3",

			connection: {
				filename: path
			},

			useNullAsDefault: true
		});
	}

	/**
	 * @param {*} message
	 */
	addMessage(message) {
		this.db("messages").insert({
			sender: message.author.id.toString(),
			sender_name: message.author.username,
			text: message.content,
			channel: message.channel.id.toString(),
			time: message.createdTimestamp
		}).then();
	}

	/**
	 * @deprecated Use hasBeenThankedAsync instead
	 * @param {string} userId
	 * @param {function} callback
	 */
	hasBeenThanked(userId, callback) {
		this.db.select().from("thanks").where("user", userId.toString()).then((result) => {
			callback(result.length > 0);
		});
	}

	/**
	 * @param {string} userId
	 * @returns {Promise<boolean>}
	 */
	async hasBeenThankedAsync(userId) {
		return (await this.db.select().from("thanks").where("user", userId.toString()).then()).length > 0;
	}

	/**
	 * @deprecated Use getThanksAsync instead
	 * @param {string} userId
	 * @param {function} callback
	 */
	getThanks(userId, callback) {
		this.hasBeenThanked(userId, (hasBeenThanked) => {
			if (!hasBeenThanked) {
				callback(0);
			} else {
				this.db.select().from("thanks").where("user", userId.toString()).then((result) => {
					callback(result[0].count);
				});
			}
		});
	}

	/**
	 * @param {string} userId
	 * @returns {Promise<void>}
	 */
	async getThanksAsync(userId) {
		if (await this.hasBeenThankedAsync(userId) === false) {
			return 0;
		}

		return await this.db.select().from("thanks").where("user", userId.toString()).then();
	}

	/**
	 * @deprecated Use addThankAsync instead
	 * @param {string} userId
	 * @param {function} callback
	 */
	addThank(userId, callback) {
		this.hasBeenThanked(userId, (exists) => {
			if (!exists) {
				this.db("thanks").insert({
					user: userId.toString(),
					count: 1
				}).then(callback);
			} else {
				this.getThanks(userId, (thanks) => {
					this.db("thanks").where("user", userId.toString()).update({
						count: thanks + 1
					}).then(callback);
				});
			}
		});
	}

	/**
	 * @deprecated Use getMessagesAsync instead
	 * @param {string} userId
	 * @param {function} callback
	 * @param {number} limit
	 */
	getMessages(userId, callback, limit = 100) {
		this.db.select().from("messages").where("sender", userId.toString()).limit(limit).orderBy("time", "desc").then(callback);
	}

	/**
	 * @deprecated Use getWarningCountAsync instead
	 * @param {string} userId
	 * @param {function} callback
	 */
	getWarningCount(userId, callback) {
		this.db.select("count").from("warnings").where("user", userId).then((warnings) => {
			if (warnings.length > 0) {
				callback(warnings[0].count);
			} else {
				callback(0);
			}
		});
	}

	/**
	 * @deprecated Use hasBeenWarnedAsync instead
	 * @param {string} userId
	 * @param {function} callback
	 */
	hasBeenWarned(userId, callback) {
		this.db.select().from("warnings").where("user", userId.toString()).then((result) => {
			callback(result.length > 0);
		});
	}

	addWarning(userId) {
		this.hasBeenWarned(userId, (hasBeenWarned) => {
			if (hasBeenWarned) {
				this.getWarningCount(userId, (warnings) => {
					console.log(warnings);

					this.db("warnings").where("user", userId.toString()).update({
						count: warnings + 1
					}).then();
				});
			} else {
				this.db("warnings").insert({
					user: userId.toString(),
					count: 1
				}).then();
			}
		});
	}
}
