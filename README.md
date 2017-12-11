# Botty
Tiny Discord bot

## Progress
* [ ] Database support
* [ ] Actual custom command trigger support
* [ ] Better command loader (not being hardcoded)
* [ ] Publish to the NPM registry as an official public package

## Known Issues
* Bot crashes when issuing a message which includes the command trigger multiple times at the start. (Regex-related issue)

## Installing & Running
1. Install Node.js (https://nodejs.org/en/)

2. Clone the repository: `git clone https://github.com/CloudRex/Botty`
3. Open up a terminal on the folder containing the downloaded files
4. Configure `settings.json` inside the `lib` folder
5. Type `npm install` to download project dependencies
6. Type `npm start` to start the bot

From here on you want to invite the bot into your server.
