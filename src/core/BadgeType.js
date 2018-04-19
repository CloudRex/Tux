// TODO: Migrate badges into JSON and make a class for it
const BadgeType = {
	EmptyInventory: 0,
	ApprenticeScripter: 1,
	IntermediateScripter: 2,
	ExperiencedScripter: 3,
	MasterScripter: 4,
	TrueFan: 5,
	TuxX: 6,

	/**
	 * @returns {array<BadgeType>}
	 */
	getAll() {
		return [
			BadgeType.EmptyInventory,
			BadgeType.ApprenticeScripter,
			BadgeType.IntermediateScripter,
			BadgeType.ExperiencedScripter,
			BadgeType.MasterScripter,
			BadgeType.TrueFan,
			BadgeType.TuxX
		];
	},

	/**
	 * @param {BadgeType} badge
	 * @returns {string}
	 */
	getName(badge) {
		switch (badge) {
			case BadgeType.EmptyInventory: {
				return "Not a Single Item";
			}

			case BadgeType.ApprenticeScripter: {
				return "The Apprentice Scripter";
			}

			case BadgeType.IntermediateScripter: {
				return "The Intermediate Scripter";
			}

			case BadgeType.ExperiencedScripter: {
				return "The Experienced Scripter";
			}

			case BadgeType.MasterScripter: {
				return "The Master Scripter";
			}

			case BadgeType.TrueFan: {
				return "The True Fan";
			}

			case BadgeType.TuxX: {
				return "Tux X";
			}

			default: {
				throw new Error(`[BadgeType.getName] Invalid badge type: ${badge}`);
			}
		}
	},

	/**
	 * @param {BadgeType} badge The badge
	 * @returns {string} The badge's description
	 */
	getDescription(badge) {
		switch (badge) {
			case BadgeType.EmptyInventory: {
				return "Use the inventory command and have no items";
			}

			case BadgeType.ApprenticeScripter: {
				return "Send 10 message including JavaScript code blocks";
			}

			case BadgeType.IntermediateScripter: {
				return "Send 50 message including JavaScript code blocks";
			}

			case BadgeType.ExperiencedScripter: {
				return "Send 100 message including JavaScript code blocks";
			}

			case BadgeType.MasterScripter: {
				return "Send 300 message including JavaScript code blocks";
			}

			case BadgeType.TrueFan: {
				return "Send a message containing the Tux emoji";
			}

			case BadgeType.TuxX: {
				return "Activate Tux's X mode";
			}

			default: {
				throw new Error(`[BadgeType.getDescription] Invalid badge type: ${badge}`);
			}
		}
	}
};

export default BadgeType;
