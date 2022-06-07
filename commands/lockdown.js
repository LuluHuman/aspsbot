exports.run = async (client, message, args, Discord, admin) => {
	try {
		/*--------Cheak if the user have admin--------*/
		const callback = client.utility.checkPerms.isMod(message.member)
		if (!callback) {
			message.reply('You have no perm to use this command')
				.then(msg => {
					setTimeout(() => msg.delete(), 10000)
				})
			return
		}
		/*---------------------------------------------------------*/
		if (args[0] == "end") {
			changePerms(true)
			return
		}
		changePerms(false)


		function changePerms(bool) {
			var lockType
			const channels = ["760767116566593606", "761776324456611870", "876124286090371082", "770168273026285588", "863369212894642176", "863373355012194314"]
			var lockedChannels = 0

			if (bool == true) { lockType = "Unlocked" }
			if (bool == false) { lockType = "Locked" }

			channels.forEach((channelId) => {
				var channel = client.channels.cache.get(channelId);
				if (!channel) return
				channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: bool })
					.catch((error) => message.channel.send(`An error has occurred${client.emotes.error} error: \n${error} `))

				++lockedChannels
			})
			message.channel.send(`${lockType} ${lockedChannels}/6 channels`)

			var Output = ""
			args.forEach(function(word) {
				if (word == args[0] && bool == true) { } else { Output = Output + " " + word }
			})
			if (Output == "" || Output == undefined) { Output = "No reason given" }


			const exampleEmbed = new Discord.MessageEmbed()
				.setColor(client.config.defcolor)
				.setTitle("🔒Lockdown🔒")
				.setDescription(`All channel has been ${lockType}. Reason:${Output}`)
				.setTimestamp()
				.setFooter('Felicity#0690', client.config.pfp);
			var notifyChannel = client.channels.cache.get("898878055626461216");
			notifyChannel.send({ embeds: [exampleEmbed] })

			client.utility.log(message.author.username, lockType + " all channels")
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "moderation"