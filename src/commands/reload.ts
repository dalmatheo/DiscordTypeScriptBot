import {ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, TextChannel} from "discord.js";
import config from "../assets/config.json"
import {reload} from "../index";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload the bot !'),
    async execute(interaction:ChatInputCommandInteraction) {
        const logchannel = interaction.guild.channels.cache.get(config.logchannel) as TextChannel
        const author = interaction.member as GuildMember
        if (author.roles.cache.get(config.staffrole)) {
            reload(interaction.client).then(() => {
                logchannel.send("The commands reloaded because " + interaction.guild.members.cache.get(interaction.user.id).displayName + " asked it.")
                interaction.reply("The commands successfully reloaded.")
            })
        } else {
            await interaction.reply("You don't have the permission to reload the commands.")
            await logchannel.send(author.displayName + " tried to reload the bot but don't have the staff role.")
        }
    },
};