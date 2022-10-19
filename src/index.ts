import {Client, IntentsBitField, Collection, TextChannel, GuildMember} from "discord.js";
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
//Turning on the bot.
logIn()

//The function to run the bot
export async function logIn(channel?:TextChannel, user?:GuildMember) {
    let reload = false
    if (channel != undefined && user != undefined) {
        reload = true
        client.destroy()
        console.clear()
    }
    await console.log("Bot is starting...");
    client.login(config.token).then(() => {
        console.log("The bot is online.")
        if (reload) {
            channel.send("The bot as restarted because <@" + user.id + "> asked it.")
        }
    })
}