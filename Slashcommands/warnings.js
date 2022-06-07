const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warnings")
		.setDescription("Get da warining")
		.addUserOption(option => option
			.setName('target')
			.setDescription('The user you want to bench')
			.setRequired(true)
		),

	async execute(inter, client) {
		try {
			const db = require("./../src/database.js")
			const user = inter.options.getUser('target');

			db.get("warns", function(err, obj) {
				obj = JSON.parse(obj)
				var value = obj[user.id]
				if (!value) value = 0
				inter.reply(`This user has ${value} warns`)

			});
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}