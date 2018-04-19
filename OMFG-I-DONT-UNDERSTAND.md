### What
This file is designed to give you an in-depth guide to coding and working with Tux.
Here's some basic stuff you should know about Tux:

* Uses the Discord.js library ([click here](https://discord.js.org/#/docs/main/stable/general/welcome) to view the documentation)
* Uses a database (will get into detail later)
* Is object oriented (most code is based on classes)
* Has a setup script (setup your token, prefix, etc.)
* Is a penguin (yes, it's important to know)

### Why
Here's some questions you might have asked yourself and their reasons:

* **Why use Discord.js?** Because it's the most popular JavaScript library for writing Discord bots.
* **Why use a database?** Because storing huge data in a JSON file is savage.
* **Why not use rethink?** Because it's way too hard to setup compared to the current system, and required a background process.

## How does it work?
### Database
Tux uses the [sqlite](https://en.wikipedia.org/wiki/SQLite) database system and the [knex.js](http://knexjs.org/) JavaScript library to access the database.
To "manually" edit/view the database structure and records, I recommend you use the free software [sqlitebrowser](http://sqlitebrowser.org/).
