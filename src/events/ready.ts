import { Client} from "discord.js";


module.exports = async (client:Client) => {
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