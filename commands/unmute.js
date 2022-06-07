exports.run = async (client, message, args, { MessageEmbed }, admin) => {
	try {
		if (!admin) {
			message.reply('You have no perm to use this command')
				.then(msg => {
					setTimeout(() => msg.delete(), 10000)
				})
			return
		}
		/*---------------------------------------------------------*/
		const target = message.mentions.users.first();
		if (!target) { message.channel.send(error("Provide a person to unmute")); return; };
		const memberTarget = message.guild.members.cache.get(target.id);
		const callback = client.utility.checkPerms.isMod(memberTarget)
		if(callback){
			return message.channel.send({embeds: [error("No mute mod")]})
		}
		const gm = message.guild.members.cache.get(memberTarget.id)
		gm.timeout(null, (args[1] ? args[1] : "nothing"))
			.then(() => {
				const embed = success("User has been un<:Benched:868094337760759818> (unmuted) for " + (args[1] ? args[1] : "nothing"))
				message.channel.send({embeds: [embed]})
			})
			.catch((err) => {
				require("./../config/errorHandler")(err, __filename)
				message.channel.send({embeds: [error("error")]})
			})
		require("./../src/log.js")(message.author.username,"unmuted "+ target.username+ " for " +(args[1] ? args[1]:"nothing"))

		if (!args[1]) return

		function success(message) {
			const successEmbed = new MessageEmbed()
				.setColor('#00ff00')
				.setDescription(message)
			return successEmbed
		}

		function error(message) {
			const errorEmbed = new MessageEmbed()
				.setColor('#ff0000')
				.setDescription(message)
			return errorEmbed
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "moderation"