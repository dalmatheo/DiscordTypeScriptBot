"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const fs = tslib_1.__importStar(require("fs"));
const config_json_1 = tslib_1.__importDefault(require("./assets/config.json"));
console.log("Bot is starting...");
// Adding the Intents to make the bot able to use get all the information that he needs.
const client = new discord_js_1.Client({
    intents: [discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessages, discord_js_1.IntentsBitField.Flags.MessageContent]
});
// Create a new collection to be able to declare the commands.
client.commands = new discord_js_1.Collection();
//Get all the files in ./events that ends with .ts
const events = fs.readdirSync("./events").filter(file => file.endsWith(".ts"));
//For every file :
for (const file of events) {
    //Get the name of the event by splitting the name of the file. You could also export it as well.
    const eventName = file.split(".")[0];
    //Getting the file.
    const event = require("./events/" + file);
    //The same as : client.on(name of the event, set the file that execute the event.)
    client.on(eventName, event.bind(null, client));
}
//Get all the file in ./commands that ends with .ts
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".ts"));
//For every file :
for (const file of commands) {
    //Getting the file
    const command = require("./commands/" + file);
    //Getting the command by an export (You can do that in events too.)
    const commandName = command.name;
    //The same as : client.on(name of the command, the file that execute the event.)
    client.commands.set(commandName, command);
}
//When the bot is on, display in the console "The bot is online.". You could also add + config.token to display the token of the bot.
client.on("ready", () => {
    console.log("The bot is online.");
});
//Turning on the bot.
client.login(config_json_1.default.token);
