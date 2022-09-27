"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Export the name of the command to make the index.ts able to use it
exports.name = "ping";
//Exporting the code and say that client is a Client object, same for the message and the args.
exports.run = (client, message, args) => {
    //Sending pong into the channel of the command.
    message.channel.send("pong!").catch(console.error);
};
