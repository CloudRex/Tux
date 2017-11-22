// NOTE: No json library that I know of for TS (worth using) + no time to make one

import Log from "./Log";
import GeneralSettings from "./GeneralSettings";

var fs = require("fs");

export default class Settings {
    // Members
    public General: GeneralSettings;
    public readonly Path: string;

    constructor(filePath: string) {
        if (fs.existsSync(filePath)) {
            this.Path = filePath;

            let jsonObj = JSON.parse(fs.readFileSync(filePath));

            this.General = new GeneralSettings(
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
        fs.writeFileSync(this.Path, JSON.stringify({
            General: this.General
		}, null, 2));
    }
}
