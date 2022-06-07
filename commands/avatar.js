exports.run = async (client, message, args, Discord) => {
	try {
		var user    																																													//Empty varable to change later
		const target = message.mentions.users.first();																												//The first mensioned user (if any) 

		if (target) { user = message.guild.members.cache.get(target.id) }																					//if have changes user varable to the guild member
		else { user = message.guild.members.cache.get(args[0]) }												 													//if dont have it chnages to first argument

		if (user == undefined) { message.channel.send(`invalid id/mention`); return } 													// if user is undefines notify user and return
		message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png?size=256`)// sends message
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "fun"