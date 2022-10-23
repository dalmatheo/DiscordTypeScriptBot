import {ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, TextChannel} from "discord.js";
import config from "../assets/config.json"


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Shut down the boy'),
    async execute(interaction:ChatInputCommandInteraction) {
        const logchannel = interaction.guild.channels.cache.get(config.logchannel) as TextChannel
        const author = interaction.member as GuildMember
        if (author.roles.cache.get(config.staffrole)) {
            logchannel.send("The bot is shuting down because " + author.displayName + " asked it.").then(() => {
                interaction.reply("Shuting down the bot...").then(() => {
                    interaction.client.application.commands.set([])
                    interaction.client.guilds.cache.get(config.guildId).commands.set([])
                    interaction.client.destroy()
                })
            })
        } else {
            await interaction.reply("You don't have the permission to stop the bot.")
            await logchannel.send(author.displayName + " tried to stop the bot but don't have the staff role.")
        }
    },
};