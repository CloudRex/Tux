const AccessLevelType = {
	Guest: 0,
	Member: 1,
	Premium: 2,
	Moderator: 3,
	Admin: 4,
	Owner: 5,

	/**
	 * @param {AccessLevelType} type
	 */
	toString(type) {
		switch (type) {
			case AccessLevelType.Guest:
				return "Guest";

			case AccessLevelType.Member:
				return "Member";

			case AccessLevelType.Premium:
				return "Premium";

			case AccessLevelType.Moderator:
				return "Moderator";

			case AccessLevelType.Admin:
				return "Admin";

			case AccessLevelType.Owner:
				return "Owner";

			default:
				return "Unknown";
		}
	},

	/**
	 * @param {string} string
	 * @returns {AccessLevelType}
	 */
	fromString(string) {
		switch (string) {
			case "Guest":
				return AccessLevelType.Guest;

			case "Member":
				return AccessLevelType.Member;

			case "Premium":
				return AccessLevelType.Premium;

			case "Moderator":
				return AccessLevelType.Moderator;

			case "Admin":
				return AccessLevelType.Admin;

			case "Owner":
				return AccessLevelType.Owner;

			default:
				return -1;
		}
	}
};

export default AccessLevelType;
