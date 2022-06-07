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
		const db = client.utility.database																											//specify the database handler
		const target = message.mentions.users.first();																					//The first mensioned user (if any) 
		if (!target) message.channel.send("Provide a person to clear warns"); return; 					//if dont have then mension and return

		const memberTarget = message.guild.members.cache.get(target.id); 												//get guild member

		db.get("warns", function(err, obj) {																										//go get warns database
			obj = JSON.parse(obj)																																	//pharse the json string
			const newObj = obj 																																		//makes a new varable to keep the old data
			newObj[memberTarget.id] = 0 																													//adds a new key which is the id of the user and set it to 0

			db.set("warns", newObj)																																// sets the database to the new data
			message.react(client.emotes.success) 																									//react to ensure that code executed successfully
			message.channel.send("Cleared all warns")																							//notify the user
		})


		client.utility.log(message.author.username, "cleared " + target.username + "'s warns'") //logs the clearence of the user
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "moderation"