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
		const target = message.mentions.users.first();
		if (!target) {message.channel.send("Provide a person to"); return}
		const user = message.guild.members.cache.get(target.id);

		var Output = ""
		args.forEach(function(word) {
			if (word == args[0]) { }
			else { Output = Output + " " + word }
		})
		if (Output == "") { Output = "No reason given" }

		client.utility.warn(message, "PREFIX", `<@${user.id}>, You have been warned by <@${message.author.id}>. Reason: ${Output}. Read the rules or `, user)
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "moderation"