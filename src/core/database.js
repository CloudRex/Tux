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

    addMessage(message) {
        this.db("messages").insert({
            sender: message.author.id.toString(),
            sender_name: message.author.username,
            text: message.content,
            channel: message.channel.id.toString(),
            time: message.createdTimestamp
        }).then();
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

    getMessages(userId, callback, limit = 100) {
        this.db.select().from("messages").where("sender", userId.toString()).limit(limit).orderBy("time", "desc").then(callback);
    }

    getWarningCount(userId, callback) {
        this.db.select("count").from("warnings").where("user", userId).then((warnings) => {
            if (warnings.length > 0)
                callback(warnings[0].count);
            else
                callback(0);
        });
    }

    hasBeenWarned(userId, callback) {
        this.db.select().from("warnings").where("user", userId.toString()).then((result) => {
            callback(result.length > 0);
        });
    }

    addWarning(userId) {
        this.hasBeenWarned(userId, (hasBeenWarned) => {
            if (hasBeenWarned)
                this.getWarningCount(userId, (warnings) => {
                    console.log(warnings);

                    this.db("warnings").where("user", userId.toString()).update({
                        count: warnings + 1
                    }).then();
                });
            else
                this.db("warnings").insert({
                    user: userId.toString(),
                    count: 1
                }).then();
        });
    }
}