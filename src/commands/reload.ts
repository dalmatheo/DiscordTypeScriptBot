import {Client, Message, TextChannel} from "discord.js";
import config from "../assets/config.json"
import {logIn} from "../index";

//Export the name of the command to make the index.ts able to use it
exports.name =  "reload";

//Exporting the code and say that client is a Client object, same for the message and the args.
exports.run = async (client:Client, message:Message, args:string[]) => {
    //Check if the member have the staffrole
    if (message.member.roles.cache.get(config.staffrole)) {
        //Use the logIn function
        await logIn(message.guild.channels.cache.get(config.logchannel) as TextChannel, message.member)
    }
}