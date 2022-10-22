import {Client, Collection, GatewayIntentBits} from "discord.js"
import config from "./assets/config.json"
import * as fs from "fs";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const events = fs.readdirSync(__dirname + "/events").filter(file => file.endsWith(".ts"))

for (const file of events) {
    const eventName = file.split(".")[0]
    const event = require(__dirname + "/events/" + file)
    client.on(eventName, event.bind(null, client))
}

const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = require(__dirname + "/commands/" + file);
    const commandName = command.data.name;
    client.commands.set(commandName, command);
}

export async function reload(client:Client) {
    const commands = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".ts"))
    for (const file of commands) {
        const command = require(__dirname + "/commands/" + file);
        console.log(command.data.name + " reloaded.")
        client.commands.delete(command.data.name)
        delete require.cache[require.resolve("./commands/" + file)]
        client.commands.set(command.data.name, command);
    }
}

client.login(config.token).then(() => console.log("The bot is online !"));