const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("howgay")
		.setDescription("Rate your gayness")
		.addUserOption(option => option
			.setName('target')
			.setDescription('Rate other people\'s gay')
		),
	async execute(inter, client) {
		try {
			const user = inter.options.getUser('target');

			function RandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			if (user) {
				const exampleEmbed = new MessageEmbed()
					.setColor(client.config.defcolor)
					.setTitle("Mr Zafran's gay r8 machine")
					.setDescription(`${user.username} is ${RandomNumber(0, 100)}% gay`)
					.setTimestamp()
					.setFooter('Felicity#2171', client.config.pfp);
				inter.reply({
					embeds: [exampleEmbed]
				})
			} else {
				const exampleEmbed = new MessageEmbed()
					.setColor(client.config.defcolor)
					.setTitle("Mr Zafran's gay r8 machine")
					.setDescription(`You are ${RandomNumber(0, 100)}% gay`)
					.setTimestamp()
					.setFooter('Felicity#2171', client.config.pfp);
				inter.reply({
					embeds: [exampleEmbed]
				})
			}
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}