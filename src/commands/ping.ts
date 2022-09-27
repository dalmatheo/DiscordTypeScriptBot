import {Client, Message} from "discord.js";

//Export the name of the command to make the index.ts able to use it
exports.name =  "ping";

//Exporting the code and say that client is a Client object, same for the message and the args.
exports.run = async (client:Client, message:Message, args:string[]) => {
    //Sending pong into the channel of the command.
    message.channel.send("pong!").catch(console.error)
}