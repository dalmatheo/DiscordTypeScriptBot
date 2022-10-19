import {Client, Message, TextChannel} from "discord.js";
import config from "../assets/config.json"

//Export the name of the command to make the index.ts able to use it
exports.name =  "ban";

//Exporting the code and say that client is a Client object, same for the message and the args.
exports.run = async (client:Client, message:Message, args:string[]) => {
    if (message.member.roles.cache.get(config.staffrole)) {
        if (args[0].startsWith("<@") && args[0].endsWith(">")) {
            const logchannel = message.guild.channels.cache.get(config.logchannel) as TextChannel
            const ptban = message.guild.members.cache.get(args[0].replace("<@", "").replace(">", ""))
            if (ptban.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                await logchannel.send(message.author.username + " tried to ban " + ptban.displayName + " but can't because his roles are higher than mine.")
                message.channel.send("You can't ban " + ptban.displayName + " because his roles are higher than mine.")
            } else if(ptban.roles.cache.get(config.staffrole)) {
                message.channel.send("You can't ban " + ptban.displayName + " because he is staff.")
                await logchannel.send(message.author.username + " tried to ban " + ptban + " but he is staff.")
            } else {
                const reason = message.content.replace(config.prefix + exports.name + " " + args[0] + " ", "")
                await ptban.ban({reason: reason, deleteMessageDays: 1})
                message.channel.send(ptban.displayName + " was banned for " + reason + ".")
                await logchannel.send(ptban.displayName + " got banned by " + message.author.username + " for " + reason + ".")
            }
        }
    } else {
        message.channel.send("You don't have the permission to ban someone.")
    }

}