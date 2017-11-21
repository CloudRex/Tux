"use strict";
// NOTE: No json library that I know of for TS (worth using) + no time to make one
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./Log");
var GeneralSettings_1 = require("./GeneralSettings");
var fs = require("fs");
var Settings = (function () {
    function Settings(filePath) {
        if (fs.existsSync(filePath)) {
            this.Path = filePath;
            var jsonObj = JSON.parse(fs.readFileSync(filePath));
            this.General = new GeneralSettings_1.default(jsonObj["General"]["Token"], jsonObj["General"]["Key"], jsonObj["General"]["CommandTrigger"]);
        }
        else
            Log_1.default.error("Could not load settings: File does not exist");
    }
    // Methods
    Settings.prototype.save = function () {
        fs.writeFileSync(this.Path, JSON.stringify({
            General: this.General
        }, null, 2));
    };
    return Settings;
}());
exports.default = Settings;
//# sourceMappingURL=Settings.js.map