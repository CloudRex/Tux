import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const typer = require("@raxor1234/typer");
const jimp = require("jimp");
const store = [];

export default {
	executed(context) {
		const isSet = () => Object.keys(store).includes(context.sender.id);
		const getStore = () => store[context.sender.id];

		const getAction = (name) => {
			for (let i = 0; i < getStore().actions.length; i++) {
				if (name === getStore().actions[i].name) {
					return getStore().actions[i];
				}
			}

			return null;
		};

		const hasAction = (name) => getAction(name) !== null;
		const clearActions = () => getStore().actions = [];

		const addAction = (name, value) => {
			const { actions } = getStore();

			if (hasAction(name)) {
				getAction(name).value = value;

				return;
			}

			getStore().actions.push({
				name: name,
				value: value
			});
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

				context.ok("Successfully set image.");

				break;
			}

			case "clear": {
				if (getStore() !== null) {
					delete store[context.sender.id];
					context.ok("Successfully cleared image memory.");
				}
				else {
					context.fail("You don't have any image in memory.");
				}

				break;
			}

			case "size": {
				const size = {
					width: parseInt(context.arguments[1].split(":")[0]),
					height: parseInt(context.arguments[1].split(":")[1])
				};

				if (isNaN(size.width) || isNaN(size.height) && (size.width > 0 && size.height > 0)) {
					context.fail("Invalid values.");

					return;
				}

				addAction("resize", size);
				context.ok(`Resized image to **${size.width}**:**${size.height}**.`);

				break;
			}

			case "scale": {
				const scale = parseFloat(context.arguments[1]);

				if (isNaN(scale)) {
					context.fail("Invalid value.");

					return;
				}

				addAction("scale", scale);
				context.ok(`Set image scale to **${scale}**.`);

				break;
			}

			case "quality": {
				const value = parseInt(context.arguments[1]);

				if (!isNaN(context.arguments[1]) && value > 0 && value <= 100) {
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
				const state = hasAction("greyscale") ? !getAction("greyscale").value : true;

				addAction("greyscale", state);
				context.ok(`Toggled **greyscale** ${state ? "on" : "off"}.`);

				break;
			}

			case "reset": {
				if (getStore().actions.length > 0) {
					clearActions();
					context.ok("You've reset your image.");
				}
				else {
					context.fail("Your image is already in its default state.");
				}

				break;
			}

			case "render": {
				jimp.read(getStore().target).then(async (image) => {
					const { actions } = getStore();

					for (let i = 0; i < actions.length; i++) {
						switch (actions[i].name) {
							case "quality": {
								image.quality(actions[i].value);

								break;
							}

							case "greyscale": {
								if (actions[i].value) {
									image.greyscale();
								}

								break;
							}

							case "resize": {
								image.resize(actions[i].value.width, actions[i].value.height);

								break;
							}

							case "scale": {
								image.scale(actions[i].value);

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

					const renderingResponse = await context.ok("<a:loading:395048045038927885> Rendering");
					const path = `temp/rendered.jpg`;

					image.write(path);
					await context.fileStream(path, "rendered.jpg");

					if (renderingResponse) {
						renderingResponse.message.delete();
					}
				});

				break;
			}

			default: {
				context.fail("Invalid sub-command. Expecting: set/render/greyscale/quality/clear/scale/size.");
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
			subCommand: "!string",
			target: "string|number"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
