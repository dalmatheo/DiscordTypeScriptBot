import {ChatInputCommandInteraction, SlashCommandBuilder, TextChannel} from "discord.js";
import config from "../assets/config.json"
import {reload} from "../index";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload the bot !'),
    async execute(interaction:ChatInputCommandInteraction) {
        if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.get(config.staffrole)) {
            const logchannel = interaction.guild.channels.cache.get(config.logchannel) as TextChannel
            reload(interaction.client).then(() => {
                logchannel.send("The commands reloaded because " + interaction.guild.members.cache.get(interaction.user.id).displayName + " asked it.")
                interaction.reply("The commands successfully reloaded.")
            })
        }
    },
};