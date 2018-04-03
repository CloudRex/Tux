# Tux
Tux is a tiny Discord bot created with flexibility in mind.

## Beginner?
Welcome! You can help this project many ways, always remember no contribution is too small!

Take a look around at the code (under the `src/` directory) and get familiar with the project.

Example of some ways to contribute:

* Try opening an issue with an idea to be implemented
* Create a pull request
* Suggest an update to the README file (this)
* Find & report spelling errors within source code files or the README file (this)

## Development roadmap
* [X] Database support
* [X] Custom command trigger support
* [X] Better command loader (not being hardcoded)
* [ ] Isolated/controlled environment for commands

## Known Issues
* Bot crashes when issuing a message which includes the command trigger multiple times at the start. (Regex-related issue)

## Prerequisites
* Node.js v8.11.1 or higher (https://nodejs.org/en/)
* Git (https://git-scm.com/)

## Installing & Running
1. Clone the repository: `git clone https://github.com/CloudRex/Tux`
2. Configure `settings.json`
3. Open up a terminal on the folder containing the downloaded files
4. Type `npm install` to download project dependencies
5. Type `npm run build` to build the project
6. Type `npm start` to start the application

From here on you want to invite the bot into your server.

## Access levels
Access levels are a way to limit access to certain commands.
For example, the `settrigger` command should only be available to the server owner, we don't want a member or guest changing our bot's trigger.

We would then let the bot know who is the server owner by specifying their role in the `access-levels.json` file (under the `src` directory) as follows:

```json
{
	"Guest": [],
	"Member": ["@everyone"],
	"Premium": [],
	"Moderator": [],
	"Admin": [],
	"Owner": ["Emperor"]
}
```

The bot now knows that any user with the `Emperor` role should be considered with an `Owner` access level (highest).

## Default access level
We can specify a default access level by using the role `@everyone` as we would normally do with any role.
Assuming we want our default access level to be `Member`, the `access-levels.json` file would look like this:

```json
{
	"Guest": [],
	"Member": ["@everyone"],
	"Premium": [],
	"Moderator": [],
	"Admin": [],
	"Owner": []
}
```

## Multiple access levels
We can also link multiple roles with an access level or more.
In this example, assume we want our server's roles `Knight` and `Esquire` have the `Member` access level.

```json
{
	"Guest": [],
	"Member": ["Knight", "Esquire"],
	"Premium": [],
	"Moderator": [],
	"Admin": [],
	"Owner": []
}
```

We could also have the `Knight` role with an `Admin` access level:

```json
{
	"Guest": [],
	"Member": ["Knight", "Esquire"],
	"Premium": [],
	"Moderator": [],
	"Admin": ["Knight"],
	"Owner": []
}
```

When we have multiple roles in multiple access levels, the bot will only take into account the highest access level (in this case `Admin`).

## Creating a Command (obsolete)
1. Create the file which will store your command under `src/data/commands`
2. Code your command:

```javascript
import Command from "../../commands/command";

export default class MyCommand extends Command {
    constructor() {
        super("my-command", "Say hello!", [], null, 0, []);
    }

    executed(context) {
        console.log("Hello, I've been executed!");
    }

    // Determine whether the command can be executed
    canExecute(context) {
        return true;
    }
}
```

3. Import and register your command on `app.js`:
```javascript
import MyCommand from "./data/commands/myCommand";
...
// Register commands & features
bot.commands.registerMultiple([
    ...
    new MyCommand()
    ...
]);
...
```
