const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setuptpanel")
        .setDescription("Creates a new tickets panel")
        .addChannelOption(i => i.setName("channel").setDescription("Channel to create the panel in.")),
    
    async execute(interaction, client) {

    }
}