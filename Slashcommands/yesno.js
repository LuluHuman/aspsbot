const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("yesno")
		.setDescription("Say you will get a gf then he wil say no")
		.addStringOption(option => option
			.setName('question')
			.setDescription('-')
			.setRequired(true)
		),
	async execute(inter, client) {
		try {
			function RandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			if (RandomNumber(0, 1) == 0) {
				var res = "no"
			} else {
				var res = "yes"
			}
			const exampleEmbed = new MessageEmbed()
				.setColor(client.config.defcolor)
				.setTitle("Question: " + inter.options.getString('question'))
				.setDescription(res)
				.setTimestamp()
				.setFooter('Felicity#0690', client.config.pfp);
			inter.reply({
				embeds: [exampleEmbed]
			})
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}