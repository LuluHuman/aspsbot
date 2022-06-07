const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("ping da bot"),
	async execute(inter, client) {
		try {
			var update = client.info
			const exampleEmbed = new MessageEmbed()
				.setColor(client.config.defcolor)
				.setTitle("Info" + client.emotes.success)
				.setDescription(`Ping: **${client.ws.ping}ms**\n Version: **MASON LIGHT**\n Process Version: **${process.version}**`)
				.setTimestamp()
				.setFooter('Felicity#0690', client.config.pfp);
			inter.reply({
				embeds: [exampleEmbed]
			})
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}