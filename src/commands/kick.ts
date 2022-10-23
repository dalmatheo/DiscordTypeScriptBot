import {ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, TextChannel} from "discord.js";
import config from "../assets/config.json"

module.exports = {

    data: new SlashCommandBuilder()
        .setName('kick')
        .addMentionableOption(option =>
            option.setName("user")
                .setRequired(true)
                .setDescription("User to kick from the discord.")
        )
        .addStringOption(option =>
            option.setName("reason")
                .setRequired(true)
                .setDescription("The reason of the kick")
        )
        .setDescription('The kick command'),
    execute: async function (interaction: ChatInputCommandInteraction) {
        const logchannel = interaction.guild.channels.cache.get(config.logchannel) as TextChannel
        const author = interaction.member as GuildMember
        const ptkick = interaction.options.data[0].member as GuildMember
        if (author.roles.cache.get(config.staffrole)) {
            if (ptkick.roles.highest.position > interaction.guild.members.resolve(interaction.client.user).roles.highest.position) {
                await logchannel.send(author.displayName + " tried to kick " + ptkick.displayName + " but can't because his roles are higher than mine.")
                await interaction.reply("You can't kick " + ptkick.displayName + " because his roles are higher than mine.")
            } else if (ptkick.roles.cache.get(config.staffrole)) {
                await interaction.reply("You can't kick " + ptkick.displayName + " because he is staff.")
                await logchannel.send(author.displayName + " tried to kick " + ptkick + " but he is staff.")
            } else {
                const reasonofkick:string = interaction.options.data[1].value.toString()
                await ptkick.kick(reasonofkick)
                await interaction.reply(ptkick.displayName + " was kicked for " + reasonofkick + ".")
                await logchannel.send(ptkick.displayName + " got kicked by " + author.displayName + " for " + reasonofkick + ".")
            }
        } else {
            await interaction.reply("You don't have the permission to kick.")
            await logchannel.send(author.displayName + " tried to kick " + ptkick.displayName + " but can't because he don't have the staff role.")
        }
    }
}