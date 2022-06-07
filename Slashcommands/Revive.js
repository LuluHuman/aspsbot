const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("revive")
		.setDescription("Revive the chat if dead"),
	async execute(inter, client) {
		try {
			inter.reply("@everyone")
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}