const readline = require("readline");
const fs = require("fs");

const ci = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const dat = [];

function empty(v) {
	return v.trim() === null || v.trim() === undefined || v.trim === "";
}

function end(msg) {
	console.log(`\n${msg}`);
	process.exit(0);
}

ci.question("name: ", (name) => {
	if (!empty(name) && /^[a-zA-Z]{2,}$/.test(name)) {
		dat.name = name;

		ci.question("desc: ", (desc) => {
			if (!empty(desc) && /^[a-zA-Z' ]+$/.test(desc)) {
				dat.desc = desc;

				ci.question("max args: ", (maxArgs) => {
					if (!empty(maxArgs) && !isNaN(maxArgs) && parseInt(maxArgs) >= 0) {
						dat.maxArgs = maxArgs;

						// TODO

						end("Process complete");
					}
					else {
						end("Invalid max arguments.");
					}
				});
			}
			else {
				end("Invalid desc.");
			}
		});
	}
	else {
		end("Invalid name.");
	}
});
