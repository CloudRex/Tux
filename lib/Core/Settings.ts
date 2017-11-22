// NOTE: No json library that I know of for TS (worth using) + no time to make one

import Log from "./log";
import GeneralSettings from "./generalSettings";

var fs = require("fs");

export default class Settings {
    // Members
    public general: GeneralSettings;
    public readonly path: string;

    constructor(filePath: string) {
        if (fs.existsSync(filePath)) {
            this.path = filePath;

            let jsonObj = JSON.parse(fs.readFileSync(filePath));

            this.general = new GeneralSettings(
                jsonObj["General"]["Token"],
                jsonObj["General"]["CommandTrigger"],
                jsonObj["General"]["Version"]
            );
        }
        else
            Log.error("Could not load settings: File does not exist");
    }

    // Methods
    public save(): void {
        fs.writeFileSync(this.path, JSON.stringify({
            General: this.general
		}, null, 2));
    }
}
