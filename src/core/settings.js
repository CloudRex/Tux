// NOTE: No json library that I know of for TS (worth using) + no time to make one

import Log from "./log";

const fs = require("fs");

export default class Settings {
	constructor(filePath) {
		if (fs.existsSync(filePath)) {
			this.path = filePath;

			const jsonObj = JSON.parse(fs.readFileSync(filePath).toString());

			this.general = jsonObj.general;
		}
		else {
			Log.error("Could not load settings: File does not exist");
		}
	}

	save() {
		fs.writeFileSync(this.path, JSON.stringify({
			general: this.general
		}, null, 4));
	}

	validate() {
		if (this.general.token === null) {
			Log.error("[Settings] Token cannot be null or empty");
		}
	}
}
