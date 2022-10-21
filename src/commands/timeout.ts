import {Client, Message} from "discord.js";
import config from "../assets/config.json"

exports.name =  "timeout";

exports.run = async (client:Client, message:Message, args:string[]) => {
    if (message.member.roles.cache.get(config.staffrole)) {
        if (args[0].startsWith("<@") && args[0].endsWith(">")) {
            const ptto = message.guild.members.cache.get(message.mentions.users.first().id)
            let time: number;
            if (args[1].endsWith("d")) {
                time = Number(args[1].replace("d", "")) * 86400000
            } else if (args[1].endsWith("h")) {
                time = Number(args[1].replace("h", "")) * 3600000
            } else if (args[1].endsWith("min")) {
                time = Number(args[1].replace("min", "")) * 60000
            } else if (args[1].endsWith("s")) {
                time = Number(args[1].replace("s", "")) * 1000
            }
            const reason = message.content.replace(config.prefix + exports.name + " " + args[0] + " " + args[1], "")
            await ptto.timeout(time, reason)
                .catch(console.error);
            await message.channel.send(message.member.displayName + " timed out " + ptto.displayName + " for " + args[1] + ". The reason is : " + reason)
        }
    }
}