exports.run = async (client, message, args, Discord, admin) => {
	try {
		/*--------Cheak if the user have admin--------*/
		const callback = client.utility.checkPerms.isOwner(message.author)
		if (!callback) {
			message.reply('You have no perm to use this command')
				.then(msg => {
					setTimeout(() => msg.delete(), 10000)
				})
			return
		}
		/*----------------------------------------------*/
		if (args[0] == "on") { idkWhatToCallThisFunction(false); return }//If say on  then it changes client.disableAnoyance to false
		if (args[0] == "off") { idkWhatToCallThisFunction(true); return }//If say off then it changes client.disableAnoyance to true
		message.channel.send("invalid args")													 //If say nothing then it say got nothing


		//Create a function
		function idkWhatToCallThisFunction(theChoiceIsYours) {
			message.channel.send("client.disableAnoyance = " + theChoiceIsYours)
			client.disableAnoyance = theChoiceIsYours
			client.utility.log(message.author.username, "client.disableAnoyance = " + theChoiceIsYours)
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "utility"