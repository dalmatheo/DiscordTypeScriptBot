import {ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, TextChannel} from "discord.js";
import config from "../assets/config.json"

module.exports = {

    data: new SlashCommandBuilder()
        .setName('timeout')
        .addMentionableOption(option =>
            option.setName("user")
                .setRequired(true)
                .setDescription("User to timeout from the discord.")
        ).addStringOption(option =>
            option.setName("time")
                .setRequired(true)
                .setDescription("Time of the timeout. In days (d), hours (h), minutes (min), seconds (s)")
        )
        .addStringOption(option =>
            option.setName("reason")
                .setRequired(true)
                .setDescription("The reason of the timeout")
        )

        .setDescription('The timeout command'),
    execute: async function (interaction: ChatInputCommandInteraction) {
        const author = interaction.member as GuildMember
        if (author.roles.cache.get(config.staffrole)) {
            const ptto = interaction.options.data[0].member as GuildMember
            const logchannel = interaction.guild.channels.cache.get(config.logchannel) as TextChannel
            if (ptto.roles.cache.get(config.staffrole)) {
                await interaction.reply("You can't timeout " + ptto.displayName + " because he is staff.")
                await logchannel.send(author.displayName + " tried to timeout " + ptto.displayName + " but he is staff.")
            } else if (ptto.roles.highest.position > interaction.guild.members.resolve(interaction.client.user).roles.highest.position) {
                await logchannel.send(author.displayName + " tried to timeout " + ptto.displayName + " but can't because his roles are higher than mine.")
                await interaction.reply("You can't timeout " + ptto.displayName + " because his roles are higher than mine.")
            } else {
                let time: number;
                if (interaction.options.data[1].value.toString().endsWith("d")) {
                    time = Number(interaction.options.data[1].value.toString().replace("d", "")) * 86400000
                } else if (interaction.options.data[1].value.toString().endsWith("h")) {
                    time = Number(interaction.options.data[1].value.toString().replace("h", "")) * 3600000
                } else if (interaction.options.data[1].value.toString().endsWith("min")) {
                    time = Number(interaction.options.data[1].value.toString().replace("min", "")) * 60000
                } else if (interaction.options.data[1].value.toString().endsWith("s")) {
                    time = Number(interaction.options.data[1].value.toString().replace("s", "")) * 1000
                } else {
                    time = Number(interaction.options.data[1].value.toString().replace("h", "")) * 3600000
                }
                const reason = interaction.options.data[2].value.toString()
                await ptto.timeout(time, reason)
                    .catch(console.error);
                await interaction.reply("You successfully timed out " + ptto.displayName +  " for " + interaction.options.data[1].value.toString() + ". The reason is : " + reason + ".")
                await logchannel.send(author.displayName + " timed out " + ptto.displayName + " for " + interaction.options.data[1].value.toString() + ". The reason is : " + reason + ".")
            }
        }
    }
}