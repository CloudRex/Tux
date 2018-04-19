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
Most (probably all) of the code used to communicate with the database is located in the `database.js` file under the `src/database/` directory.

Some notes about database communication:

* All database methods are async

#### Database Models
Don't let the name scare you, it's just a name. Database models are basically a "model" of the database tables (they are actually just classes). Let me elaborate:

Let's say we have a table called `users` (which we actually do) and that table has the columns/properties: `id`, `name`, and `age`.
In this case, we would create a database model as follows:

```javascript
class dbUser {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
```

Now we have our "model" or class for the `users` table called `dbUser` (always use the `db` prefix when naming models to distinguish between database models and other classes).
You might be asking yourself: "Why do you use database models?" Database models actually make communication with the database easier, which I will later explain why.
You may think of a database model as a local database row of a certain table.

Now that we have our model, with a little more setup, whenever we query a row from the database we can expect that when we use a database method (for example `getUserById()`) it will return an instance of our `dbUser` model.

Let's say we have the following data in our `users` table:

| id                 | name     | age |   |   |
|--------------------|----------|-----|---|---|
| 285578743324606482 | John Doe | 21  |   |   |

We could then do this (somewhat-pseudo-code):

```javascript
const theDankUser = await database.getUserById("285578743324606482") // example id provided, returns instance of dbUser

theDankUser.id; // 285578743324606482
theDankUser.name; // John Doe
theDankUser.age; // 21
```

See how that helps now?
