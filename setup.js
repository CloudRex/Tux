const readline = require("readline");
const fs = require("fs");

const settingsPath = "./src/settings.json";
const defaultSettingsPath = "./src/settings.default.json";
const accessLevelsPath = "./src/access-levels.json";
const defaultAccessLevelsPath = "./src/access-levels.default.json";
const dbPath = "botty.db";
const defaultDbPath = "botty.default.db";

const cInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function err(message) {
	console.log(`\n${message}`);
	process.exit(0);
}

if (parseFloat(process.version.substring(1)) < 8.11) {
	err("Please make sure you have Node version 8.11 or higher installed (version 9 not recommended)");
}

const data = [];

function save() {
	// Save Settings ------------------------------------------------
	const newData = JSON.parse(fs.readFileSync(defaultSettingsPath).toString());

	newData.general.token = data.token;
	newData.general.commandTrigger = (data.trigger !== "" ? data.trigger : ".");
	newData.general.giphyApiKey = (data.giphyApiKey !== "" ? data.giphyApiKey : "");

	fs.writeFileSync(settingsPath, JSON.stringify(newData, null, 4));
	// --------------------------------------------------------------

	// Save Owner ---------------------------------------------------
	const newAccessLevels = JSON.parse(fs.readFileSync(defaultAccessLevelsPath).toString());

	if (data.owner !== "") {
		newAccessLevels.Owner = [data.owner.toString()];
	}

	fs.writeFileSync(accessLevelsPath, JSON.stringify(newAccessLevels, null, 4));
	// --------------------------------------------------------------

	// Save database ------------------------------------------------
	if (!fs.existsSync(dbPath)) {
		fs.copyFileSync(defaultDbPath, dbPath);
	}

	err("You have successfully setup the bot and you may now run it using npm start");
	err("Any additional settings can be set in src/settings.json and src/access-levels.json");
}

function finish() {
	const existsSettings = fs.existsSync(settingsPath);
	const existsAccessLevels = fs.existsSync(accessLevelsPath);

	if (existsSettings || existsAccessLevels) {
		cInterface.question("settings.json or access-levels.json files already exist, do you wish to overwrite them? (y/N) ", (answer) => {
			if (answer.trim().toLowerCase() === "y" || answer.trim().toLowerCase() === "yes") {
				if (existsSettings) {
					fs.unlinkSync(settingsPath);
				}

				if (existsAccessLevels) {
					fs.unlinkSync(accessLevelsPath);
				}

				save();
			}
			else {
				err("Process canceled. No changes were made.");
			}
		});
	}
	else {
		save();
	}
}


function init() {
	cInterface.question("Bot token: ", (token) => {
		data.token = token;

		if (token.trim() === "") {
			err("Bot token cannot be null or empty");
		}

		cInterface.question("Command trigger (.): ", (trigger) => {
			data.trigger = trigger;

			cInterface.question("Giphy API Key (none): ", (giphyApiKey) => {
				data.giphyApiKey = giphyApiKey;

				cInterface.question("Bot owner's Discord id or role (none): ", (owner) => {
					data.owner = owner;
					finish(cInterface);
				});
			});
		});
	});
}

init();
