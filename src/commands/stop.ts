import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import config from "../assets/config.json"


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Shut down the boy'),
    async execute(interaction:ChatInputCommandInteraction) {
        if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.get(config.staffrole)) {
            interaction.reply("Shuting down the bot...").then(() => {
                interaction.client.application.commands.set([])
                interaction.client.guilds.cache.get(config.guildId).commands.set([])
                interaction.client.destroy()
            })
        }
    },
};