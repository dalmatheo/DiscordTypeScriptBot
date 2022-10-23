import {Client, TextChannel} from "discord.js";
import config from "../assets/config.json"


module.exports = async (client:Client) => {
    const logchannel = client.guilds.cache.get(config.guildId).channels.cache.get(config.logchannel) as TextChannel
    await logchannel.send("The bot is on !")
    client.user.setPresence({
        activities: [{
            name: "your mother",
            type: 3
        }],
        status: "online"
    })
    client.commands.forEach(function (command) {
        const commanddata = command.data
        client.application.commands.create({
            name: commanddata.name,
            description: commanddata.description,
            options: commanddata.options
        }).then(() => console.log(commanddata.name +" loaded!"))
    })
}