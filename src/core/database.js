import Log from "./log";

const fs = require("fs");

export default class Database {
    constructor(filePath) {
        this.path = filePath;

        if (!fs.existsSync(filePath))
            Log.error("[Database] Invalid database file path");

        this.db = require("knex")({
            client: "sqlite3",

            connection: {
                filename: filePath
            },

            useNullAsDefault: true
        });
    }

    // TODO: remove callbacks, implement await somehow
    hasBeenThanked(userId, callback) {
        this.db.select().from("thanks").where("user", userId.toString()).then((result) => {
            callback(result.length > 0);
        });
    }

    getThanks(userId, callback) {
        this.hasBeenThanked(userId, (hasBeenThanked) => {
            if (!hasBeenThanked)
                callback(0);
            else {
                this.db.select().from("thanks").where("user", userId.toString()).then((result) => {
                    callback(result[0].count);
                });
            }
        });
    }

    addThank(userId, callback) {
        this.hasBeenThanked(userId, (exists) => {
            if (!exists)
                this.db("thanks").insert({
                    user: userId.toString(),
                    count: 1
                }).then(callback);
            else {
                this.getThanks(userId, (thanks) => {
                    this.db("thanks").where("user", userId.toString()).update({
                        count: thanks + 1
                    }).then(callback);
                });
            }
        });
    }
}