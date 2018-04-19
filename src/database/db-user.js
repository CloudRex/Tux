export default class DbUser {
	/**
	 * @param {number} id
	 * @param {Snowflake} userId
	 * @param {number} thanks
	 * @param {number} points
	 * @param {boolean} isScopeLocked
	 * @param {array<string>} commands
	 * @param {array<string>} badges
	 */
	constructor(id, userId, thanks, points, isScopeLocked, commands = [], badges = []) {
		this.id = id;
		this.userId = userId;
		this.thanks = thanks;
		this.points = points;
		this.isScopeLocked = isScopeLocked;
		this.commands = commands;
		this.badges = badges;
	}

	/**
	 * @param {object} queryResult
	 * @returns {DbUser}
	 */
	static fromResult(queryResult) {
		return new DbUser(
			queryResult.id,
			queryResult.user_id,
			queryResult.thanks,
			queryResult.points,
			queryResult.is_scope_locked,
			JSON.parse(queryResult.commands),
			JSON.parse(queryResult.badges)
		);
	}

	/**
	 * @param {array<object>} queryResults
	 * @returns {array<DbUser>}
	 */
	static fromResults(queryResults) {
		return queryResults.map((queryResult) => DbUser.fromResult(queryResult));
	}
}
