import {Client, Message} from "discord.js";
import config from "../assets/config.json"
//Exporting the module to make index.ts able to use the code. Also declaring client as a Client object, declaring Message as a message object to make the IDE able to do great code completion.
module.exports = async (client:Client, message:Message) => {
    //If the message don't start with the prefix, do nothing. I put that before verifying if the author is a bot because there will be more message that don't start with "!" that message sends by bots.
    if (!message.content.startsWith(config.prefix)) return;
    //Check if the message author is a bot.
    if (message.author.bot) return;
    //Display in the console the author of the message, the content of the message and the fact that he tried to execute a command.
    console.log(message.author.tag + " tried to execute the command " + message.content)
    //Creating the arguments of the command (after the !command) to make the command file able to use those. Also declaring that it's a list of string.
    const args:string[] = message.content.slice(config.prefix.length).trim().split(/ +/g)
    //Getting the command itself.
    const command = args.shift().toLowerCase()
    //Getting the potential file that will execute the command.
    const executor = client.commands.get(command)
    //See if the file that will execute the command exist.
    if (!executor) return
    //Said that the author of the message executed the command.
    console.log(message.author.tag + " executed the command " + message.content)
    //Execute the command
    executor.run(client, message, args)
}