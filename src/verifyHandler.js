module.exports = (client, message) => {
	try {
		var nodemailer = require('nodemailer')
		if (message.channel.id != "919110474979749889") return
		message.delete()

		var email = message.content.split(" ")[0]
		email = {
			name: email.split("@")[0],
			domain: email.split("@")[1]
		}
		const level = message.content.split(" ")[1]

		if (email.domain == "moe.edu.sg") {
			console.log(message.guild.members.cache.get(message.author.id))
			message.guild.members.cache.get(message.author.id).roles.add("876100434719309834")
			message.guild.members.cache.get(message.author.id).setNickname(email.name.split("_").join(" "))
		} else if (email.domain == "students.edu.sg") {
			message.guild.members.cache.get(message.author.id).roles.add("863274785114161152")
			message.guild.members.cache.get(message.author.id).setNickname(email.name.split("_").join(" "))
		} else {
			message.author.send("Invalid domain. Do you mean " + email.name + "@students.edu.sg")
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
