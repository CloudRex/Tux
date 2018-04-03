# Botty
Tiny Discord bot

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
* [ ] Custom command trigger support
* [X] Better command loader (not being hardcoded)

## Known Issues
* Bot crashes when issuing a message which includes the command trigger multiple times at the start. (Regex-related issue)

## Installing & Running
1. Install Node.js (https://nodejs.org/en/)

2. Clone the repository: `git clone https://github.com/CloudRex/Botty`
3. Configure `settings.json`
4. Open up a terminal on the folder containing the downloaded files
5. Type `npm install` to download project dependencies
6. Type `npm run build` to build the project
7. Type `npm start` to start the application

From here on you want to invite the bot into your server.

## Creating a Command
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
