const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Shows someone's pfp")
		.addUserOption(option => option
			.setName('target')
			.setDescription('The user you want the pfp')
			.setRequired(true)
		),
	async execute(inter, client) {
		try {
			const user = inter.options.getUser('target');
			inter.reply(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}