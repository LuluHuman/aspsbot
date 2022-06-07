const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("iq")
		.setDescription("Rate your iq")
		.addUserOption(option => option
			.setName('target')
			.setDescription('Rate other people\'s iq')
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
					.setTitle("Mr Zafran's iq r8 machine")
					.setDescription(`${user.username} has ${RandomNumber(0, 108)} IQ`)
					.setTimestamp()
					.setFooter('Felicity#2171', client.config.pfp);
				inter.reply({
					embeds: [exampleEmbed]
				})
			} else {
				const exampleEmbed = new MessageEmbed()
					.setColor(client.config.defcolor)
					.setTitle("Mr Zafran's gay r8 machine")
					.setDescription(`You have ${RandomNumber(0, 108)} IQ `)
					.setTimestamp()
					.setFooter('Felicity#2171', client.config.pfp);
				inter.reply({
					embeds: [exampleEmbed]
				})
			}
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}