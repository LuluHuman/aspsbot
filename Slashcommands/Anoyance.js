const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("anoyance")
		.setDescription("so that ZiQian Joel and Aaryan bot can finally * up(admin)")
		.addBooleanOption(option => option
			.setName('label')
			.setDescription('if true he can shut the * up')
			.setRequired(true)
		),
	async execute(inter, client) {
		try {
			const label = inter.options.getBoolean('label');
			const authUser = inter.guild.members.cache.get(inter.user.id);
			if (!authUser.roles.cache.has("867295894512730132")) {
				inter.reply({
					content: "You dont have permision. Go away",
					ephemeral: true
				})
				return
			}

			idkWhatToCallThisFunction(label)

			function idkWhatToCallThisFunction(theChoiceIsYours) {
				inter.reply("client.disableAnoyance = " + theChoiceIsYours)
				client.disableAnoyance = theChoiceIsYours
				require("../src/log.js")(inter.user.username, "client.disableAnoyance = " + theChoiceIsYours)
			}
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}