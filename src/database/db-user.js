export default class DbUser {
	/**
	 * @param {number} id
	 * @param {Snowflake} userId
	 * @param {number} thanks
	 * @param {number} points
	 * @param {boolean} isScopeLocked
	 */
	constructor(id, userId, thanks, points, isScopeLocked) {
		this.id = id;
		this.userId = userId;
		this.thanks = thanks;
		this.points = points;
		this.isScopeLocked = isScopeLocked;
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
			queryResult.is_scope_locked
		);
	}
}
