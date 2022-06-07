const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("clearwarns")
		.setDescription("clear warns of someone(admin)")
		.addUserOption(option => option
			.setName('target')
			.setDescription('The user you want to the warns to clear')
			.setRequired(true)
		),
	async execute(inter, client) {
		try {
			const target = inter.options.getUser('target');

			const db = require("./../src/database.js")
			const memberTarget = inter.guild.members.cache.get(target.id);

			db.get("warns", function(err, obj) {
				obj = JSON.parse(obj)
				const newObj = obj
				newObj[memberTarget.id] = 0

				db.set("warns", newObj)
				inter.reply("Cleared all warns")
			})


			require("./../src/log.js")(inter.user.username, "cleared " + target.username + "'s warns'")
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}