import AccessLevelType from "../../core/access-level-type";
import DbTrade from "../../database/db-trade";
import TradeState from "../../core/trade-state";
import EmojiMenu from "../../emoji-ui/emoji-menu";
import EmojiButton from "../../emoji-ui/emoji-button";
import MessageBuilder from "../../core/message-builder";

const Discord = require("discord.js");

export default {
	async executed(context) {
		// if (context.arguments.length > 1) {
			switch (context.arguments[0]) {
				case "status": {
					const activeTrade = await context.bot.database.getActiveTradeBySender(context.message.author.id);

					if (activeTrade === null) {
						context.respond("You don't currently have an active trade.", "", "RED");
					}
					else {
						const items = new MessageBuilder();
						const recipient = context.bot.client.users.find("id", activeTrade.recipientId);
						const dbItems = await context.bot.database.getTradePropositions(activeTrade.id);

						for (let i = 0; i < dbItems.length; i++) {
							items.add(`:${dbItems[i].key}:x${dbItems[i].amount} (:small_orange_diamond:${dbItems[i].value})`);

							if (i !== dbItems.length - 1) {
								items.add(", ");
							}
						}

						context.respond(items.build(), `Trade with ${recipient.username}`);
					}

					break;
				}

				case "cancel": {
					const activeTrade = await context.bot.database.getActiveTradeBySender(context.message.author.id);
					const recipient = context.bot.client.users.find("id", activeTrade.recipientId);

					if (activeTrade === null) {
						context.respond("You don't currently have an active trade to cancel.", "", "RED");
					}
					else {
						context.bot.database.setTradeState(activeTrade.id, TradeState.Canceled);
						context.respond(`Canceled active trade with **${recipient.username}**.`);
					}

					break;
				}

				case "create": {
					const target = context.message.mentions.members.array()[0].user;

					if (target.bot) {
						context.respond(":thinking: You cannot trade with a bot.", "", "RED");
					}
					else if (target.id === context.message.author.id) {
						const pendingTrade = await context.bot.database.getPendingTradeByRecipient(target.id);
						const activeTrade = await context.bot.database.getActiveTradeBySender(context.message.author.id);

						if (pendingTrade) {
							context.respond(`You already have a pending trade with **${target.username}**.`, "", "RED");
						}
						else if (activeTrade === null) {
							await context.bot.database.addTrade(new DbTrade(null, context.message.id, context.message.author.id, target.id, [], [], TradeState.Preparing));
							context.respond(`You've created a trade with **${target.username}**`, "", "GREEN");
						}
						else {
							const { username } = context.bot.client.users.find("id", activeTrade.recipientId);

							context.respond(`You must cancel your active trade with **${username}** in order to create a new one.`, "", "RED");
						}
					}
					else {
						context.respond(":thinking: You can't trade with yourself!", "", "RED");
					}

					break;
				}

				case "add": {
					const amount = ((context.arguments[2] !== undefined) ? parseInt(context.arguments[2]) : 1);
					const item = await context.bot.database.getItem(context.message.author.id, context.arguments[1]);
					const activeTrade = await context.bot.database.getActiveTradeBySender(context.message.author.id);

					if (activeTrade) {
						const { username } = context.bot.client.users.find("id", activeTrade.recipientId);

						if (item !== null && item.amount >= amount) {
							await context.bot.database.addTradeProposition(context.message.author.id, item, amount);

							// TODO: User username instead of id
							context.respond(`Added :${item.key}:x${item.amount} to the active trade with **${username}**`, "", "BLUE");
						}
						else {
							context.respond("Operation failed: You either don't own that item or don't have that amount", "", "RED");
						}
					}
					else {
						context.respond(":thinking: You don't currently have any active trade.", "", "RED");
					}

					break;
				}

				// TODO: Remove trade item command

				case "send": {
					const activeTrade = await context.bot.database.getActiveTradeBySender(context.message.author.id);

					if (activeTrade) {
						const sender = context.bot.client.users.find("id", activeTrade.senderId);
						const recipient = context.bot.client.users.find("id", activeTrade.recipientId);
						const recipientChannel = (recipient.dmChannel ? recipient.dmChannel : await recipient.createDM());
						const senderChannel = (sender.dmChannel ? sender.dmChannel : await sender.createDM());

						context.respond(`Successfully send trade offer to **${recipient.username}**. (Trade#${activeTrade.id})`);
						context.bot.database.setTradeState(activeTrade.id, TradeState.Pending);

						const items = new MessageBuilder();
						const dbItems = await context.bot.database.getTradePropositions(activeTrade.id);

						for (let i = 0; i < dbItems.length; i++) {
							items.add(`:${dbItems[i].key}:x${dbItems[i].amount} (:small_orange_diamond:${dbItems[i].value})`);

							if (i !== dbItems.length - 1) {
								items.add(", ");
							}
						}

						context.bot.emojis.show(recipientChannel, new EmojiMenu([
							new EmojiButton("✅", async (message, user) => {
								message.delete();

								// TODO: Check if pending trade still exists
								const pendingTrade = await context.bot.database.getPendingTradeByRecipient(user.id);
								const senderInventory = await context.bot.database.getItems(pendingTrade.senderId);
								const recipientInventory = await context.bot.database.getItems(pendingTrade.recipientId);
								const tradePropositions = await context.bot.database.getTradePropositions(pendingTrade.id);
								const tradeDemands = await context.bot.database.getTradeDemands(pendingTrade.id);

								for (let demandIndex = 0; demandIndex < tradeDemands.length; demandIndex++) {
									let found = false;

									for (let inventoryIndex = 0; inventoryIndex < senderInventory.length; inventoryIndex++) {
										if (tradeDemands[demandIndex].id === senderInventory[inventoryIndex].id && tradeDemands[demandIndex].amount >= senderInventory[inventoryIndex].amount) {
											found = true;

											break;
										}
									}

									if (!found) {
										recipientChannel.send("The trade sender no longer owns the proposed items. The trade has been canceled.");
										context.bot.database.setTradeState(pendingTrade.id, TradeState.Canceled);

										return;
									}
								}

								console.log("pass 1");

								for (let propositionIndex = 0; propositionIndex < tradePropositions.length; propositionIndex++) {
									let found = false;

									for (let inventoryIndex = 0; inventoryIndex < recipientInventory.length; inventoryIndex++) {
										console.log(recipientInventory[inventoryIndex]);

										if (tradePropositions[propositionIndex].id === recipientInventory[inventoryIndex].id && tradePropositions[propositionIndex].amount >= senderInventory[inventoryIndex].amount) {
											found = true;

											break;
										}
									}

									if (!found) {
										recipientChannel.send("You no longer own that items. The trade has been canceled.");
										context.bot.database.setTradeState(pendingTrade.id, TradeState.Canceled);

										return;
									}
								}

								context.bot.database.setTradeState(activeTrade.id, TradeState.Accepted);
								recipientChannel.send(`You **accepted** the trade with **${sender.username}**. (Trade#${activeTrade.id})`);
								senderChannel.send(`${recipient.username} **accepted** your trade offer. (Trade#${activeTrade.id})`);

								for (let propositionIndex = 0; propositionIndex < tradePropositions.length; propositionIndex++) {
									context.bot.database.removeItem(pendingTrade.senderId, tradePropositions[propositionIndex].key, tradePropositions[propositionIndex].amount);
									tradePropositions[propositionIndex].userId = pendingTrade.recipientId;
									context.bot.database.addItem(tradePropositions[propositionIndex], tradePropositions[propositionIndex].amount);
								}

								for (let demandIndex = 0; demandIndex < tradeDemands.length; demandIndex++) {
									context.bot.database.removeItem(pendingTrade.recipientId, tradeDemands[demandIndex].key, tradeDemands[demandIndex].amount);
									tradeDemands[demandIndex].userId = pendingTrade.senderId;
									context.bot.database.addItem(tradeDemands[demandIndex], tradeDemands[demandIndex].amount);
								}
							}),

							new EmojiButton("❌", async (message, user) => {
								message.delete();
								context.bot.database.setTradeState(activeTrade.id, TradeState.Declined);
								recipientChannel.send(`You **declined** the trade with **${sender.username}** (Trade#${activeTrade.id})`);
								senderChannel.send(`${recipient.username} **declined** your trade offer. (Trade#${activeTrade.id})`);
							})
						], new Discord.RichEmbed().setDescription(`${sender.username} wants to trade`).setColor("GOLD").addField("Propositions", items.build())));
					}
					else {
						context.respond("You don't have any active trades.", "", "RED");
					}

					break;
				}

				default: {
					context.respond("Invalid trade action.", "", "RED");
				}
			}
		/* }
		else {
			context.respond("Expecting 2 arguments", "", "RED");
		} */
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "trade",
		description: "Trade with another user",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 3,

		args: {
			command: "!string",

			// TODO: Does not stack up with other design pattern (multiple posibilities)
			query: ""
		}
	}
};
