export default class EmojiMenuManager {
	constructor(client) {
		this.client = client;
		this.awaiting = [];

		this.client.on("messageReactionAdd", (reaction, user) => {
			for (let i = 0; i < this.awaiting.length; i++) {
				if (!user.bot) {
					// if (this.awaiting[i].user.id === user.id) {
					for (let buttonIndex = 0; buttonIndex < this.awaiting[i].menu.buttons.length; buttonIndex++) {
						if (this.awaiting[i].menu.buttons[buttonIndex].emoji === reaction.emoji.name) {
							this.awaiting[i].menu.buttons[buttonIndex].handle(reaction.message, user);
						}
					}
					// }
				}
			}
		});
	}

	/**
	 * @param {*} channel
	 * @param {EmojiMenu} menu
	 */
	async show(channel, menu) {
		const sentMessage = await channel.send(menu.content);

		for (let i = 0; i < menu.buttons.length; i++) {
			sentMessage.react(menu.buttons[i].emoji);
		}

		this.awaiting.push({
			menu: menu,
			channel: channel
		});
	}
}
