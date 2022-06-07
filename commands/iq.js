exports.run = async (client, message, args, Discord) => {
	try {
		const enteries = {
			"*USERID": "<@*USERID> have ∞ IQ",//example
		}
		function RandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		const target = message.mentions.users.first();
		if (target) {
			const memberTarget = message.guild.members.cache.get(target.id);
			const desc = enteries[memberTarget.id]

			if (desc) {
				makeEmbed(desc)
			} else {
				makeEmbed(`<@${memberTarget.id}> is ${RandomNumber(40, 228)}% gay`)
			}
		}else{
			const desc = enteries[message.author.id]

			if (desc) {
				makeEmbed(desc)
			} else {
				makeEmbed(`you are ${RandomNumber(40, 228)}% gay`)
			}
		}

		function makeEmbed(desc) {
			const exampleEmbed = new Discord.MessageEmbed()
				.setColor(client.config.defcolor)
				.setTitle("Mr Zafran's iq r8 machine")
				.setDescription(desc)
				.setTimestamp()
				.setFooter('https://Mason-bot.xyz', client.config.pfp);
			message.channel.send({ embeds: [exampleEmbed] })
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "fun"