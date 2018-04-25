import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const jimp = require("jimp");
const store = [];

export default {
	executed(context) {
		const isSet = () => {
			return Object.keys(store).includes(context.sender.id);
		};
		
		const getStore = () => {
			return store[context.sender.id];
		};
		
		if (context.arguments[0] !== "set" && !isSet()) {
			context.fail("You don't have any image set for manipulation.");
			
			return;
		}
		
		// TODO: Check for repeated actions (and overwrite them).
		switch (context.arguments[0]) {
			case "set": {
				store[context.sender.id] = {
					target: context.arguments[1],
					actions: []
				};
				
				context.ok("Sucessfully set image.");
				
				break;
			}
			
			case "quality": {
				const value = parseInt(context.arguments[2]);
				
				if (!isNaN(context.arguments[2]) && value > 0 && value <= 100) {
					getStore().actions.push({
						name: "quality",
						value: value
					});
					
					context.ok(`Set **quality** to **${value}**.`);
				}
				else {
					context.fail("Invalid value.");
				}
				
				break;
			}
			
			// TODO: Toggle greyscale if repeated
			case "greyscale": {
				getStore().actions.push({
					name: "greyscale",
					value: null
				});
				
				context.ok("Added **greyscale**.");
				
				break;
			}
			
			case "render": {
				context.fileStream(jimp.read(getStore().target).then((image) => {
					const actions = getStore().actions;
					
					for (let i = 0; i < actions.length; i++) {
						switch (actions[i].name) {
							case "quality": {
								image.quality(actions[i].value);
								
								break;
							}
							
							case "greyscale": {
								image.greyscale();
								
								break;
							}
							
							case "blur": {
								image.blur(actions[i].value);
								
								break;
							}
							
							default: {
								throw new Error(`[ImageCommand.render] Invalid action type: ${actions[i]}`);
							}
						}
					}
				}));
				
				break;
			}
			
			default: {
				context.fail("Invalid subcommand. Expecting: set/render.");
			}
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "image",
		description: "Manipulate an image",
		accessLevel: AccessLevelType.Member,
		aliases: ["img"],
		maxArguments: 2,
		
		args: {
			subcommand: "!string",
			target: "!string"
		},
		
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
