const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("warn someone(admin)")
		.addUserOption(option => option
			.setName('target')
			.setDescription('The user you want to warn')
			.setRequired(true)
		)
		.addStringOption(option => option
			.setName('reason')
			.setDescription('the reason why you want to warn')
		),
	async execute(inter, client) {
		try {
			const user = inter.options.getUser('target');
			const reason = inter.options.getString('reason');
			const tarUser = inter.guild.members.cache.get(user.id);

			const authUser = inter.guild.members.cache.get(inter.user.id);
			if (!authUser.roles.cache.has("867295894512730132")) {
				inter.reply({
					content: "You dont have permision. Go away",
					ephemeral: true
				})
				return
			}


			if (reason == "") { reason = "No reason given" }

			require("../src/warn.js")(inter, "SLASH", `<@${user.id}>, You have been warned by <@${authUser.id}>. Reason: ${reason}. Read the rules or `, user)
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}