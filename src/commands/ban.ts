import {
    ChatInputCommandInteraction,
    GuildMember,
    SlashCommandBuilder,
    TextChannel
} from "discord.js";
import config from "../assets/config.json"

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ban')
        .addMentionableOption(option =>
            option.setName("user")
                .setRequired(true)
                .setDescription("User to ban from the discord.")
        )
        .addStringOption(option =>
            option.setName("reason")
                .setRequired(true)
                .setDescription("The reason of the ban")
        )
        .addIntegerOption(option =>
            option.setName("deletetime")
                .setRequired(false)
                .setDescription("Delete all message that was post between now and minus this time. This is in hour")
        )
        .setDescription('The ban command'),
    execute: async function (interaction: ChatInputCommandInteraction) {
        const logchannel = interaction.guild.channels.cache.get(config.logchannel) as TextChannel
        const ptban = interaction.options.data[0].member as GuildMember
        const author = interaction.member as GuildMember
        if (author.roles.cache.get(config.staffrole)) {
            if (ptban.roles.highest.position > interaction.guild.members.resolve(interaction.client.user).roles.highest.position) {
                await logchannel.send(author.displayName + " tried to ban " + ptban.displayName + " but can't because his roles are higher than mine.")
                await interaction.reply("You can't ban " + ptban.displayName + " because his roles are higher than mine.")
            } else if (ptban.roles.cache.get(config.staffrole)) {
                await interaction.reply("You can't ban " + ptban.displayName + " because he is staff.")
                await logchannel.send(author.displayName + " tried to ban " + ptban + " but he is staff.")
            } else {
                if (interaction.options.data[2].value != undefined) {
                    const reason = interaction.options.data[1].value
                    await ptban.ban({deleteMessageSeconds: 3600})
                    await interaction.reply(ptban.displayName + " was banned for " + reason + ".")
                    await logchannel.send(ptban.displayName + " got banned by " + author.displayName + " for " + reason + ".")
                } else {
                    const reasonofban = interaction.options.data[1].value
                    const dltmsghr:number = Number(interaction.options.data[2].value) * 3600
                    await ptban.ban({deleteMessageSeconds: dltmsghr, reason: reasonofban.toString()})
                    await interaction.reply(ptban.displayName + " was banned for " + reasonofban + ".")
                    await logchannel.send(ptban.displayName + " got banned by " + author.displayName + " for " + reasonofban + ".")
                }
            }
        } else {
            await interaction.reply("You don't have the permission to ban.")
            await logchannel.send(author.displayName + " tried to ban " + ptban.displayName + " but can't because he don't have the staff role.")
        }
    }
}