const BadgeType = {
	EmptyInventory: 0,

	/**
	 * @param {BadgeType} badge
	 * @returns {string}
	 */
	getName(badge) {
		switch (badge) {
			case BadgeType.EmptyInventory: {
				return "Not a single item";
			}

			default: {
				throw new Error(`[BadgeType.getName] Invalid badge type: ${badge}`);
			}
		}
	}
};

export default BadgeType;
