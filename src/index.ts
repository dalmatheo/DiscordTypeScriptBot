import {Client, IntentsBitField, Collection} from "discord.js";
import * as fs from "fs";
import config from "./assets/config.json"

// Adding the Intents to make the bot able to use get all the information that he needs.
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

// Create a new collection to be able to declare the commands.
client.commands = new Collection();

//Get all the files in ./events that ends with .ts
const events = fs.readdirSync(__dirname + "/events").filter(file => file.endsWith(".ts"))
//For every file :

for (const file of events) {
    //Get the name of the event by splitting the name of the file. You could also export it as well.
    const eventName = file.split(".")[0]
    //Getting the file.
    const event = require(__dirname + "/events/" + file)
    //The same as : client.on(name of the event, set the file that execute the event.)
    client.on(eventName, event.bind(null, client))
}

//Get all the file in ./commands that ends with .ts
const commands = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".ts"))
//For every file :
for (const file of commands) {
  //Getting the file
  const command = require(__dirname + "/commands/" + file);
  //Getting the command by an export (You can do that in events too.)
  const commandName = command.name;
  //The same as : client.on(name of the command, the file that execute the event.)
  client.commands.set(commandName, command);
}

client.login(config.token).then(r => console.log("The bot is online !"))