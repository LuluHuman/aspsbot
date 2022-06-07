module.exports = (base, type, warnMessage, user) => {
	try {
		if (type == "SLASH") {
			require("./log.js")(base.user.username, user.username + " Has been warned")
		} else {

		}
		const db = require("./database.js")

		db.get("warns", function(err, obj) {
			obj = JSON.parse(obj)
			//1
			if (!user) {
				warnMessage = type
				user = warnMessage
			}
			if (!obj[user.id]) {
				const newObj = obj
				newObj[user.id] = 1
				db.set("warns", newObj)
				warning(0)
				return
			}
			const value = obj[user.id]
			if (value >= 4) {

				if (warnMessage == "If i hear one more bad word from you") {
					user.send("you have been <:Benched:868094337760759818>(muted) for swearing")
					sendString("<@" + user.id + "> has been <:Benched:868094337760759818>(muted) for swearing")
				} else if (warnMessage == "No bot commands in <#760767116566593606> i will leave you off with a warning") {
					user.send("you have been <:Benched:868094337760759818>(muted) for using bot commands in #general")
					sendString("<@" + user.id + "> has been <:Benched:868094337760759818>(muted) for using bot commands in #general")
				} else if (warnMessage == "Warning: Spamming in this channel is forbidden. If you are caught spamming you will be ") {
					user.send("you have been <:Benched:868094337760759818>(muted) for spamming")
					sendString("<@" + user.id + "> has been <:Benched:868094337760759818>(muted) for spamming")
				} else {
					user.send("you have been <:Benched:868094337760759818>(muted). Reason: Too many warns")
					sendString("<@" + user.id + "> has been <:Benched:868094337760759818>(muted) Reason: Too many warns")
				}

				const gm = base.guild.members.cache.get(user.id)
				gm.timeout(3600000)
					.catch(() => { require("./../config/errorHandler")(err, __filename) })
			} else {
				warning(value)
				const newObj = obj
				newObj[user.id] = obj[user.id] + 1
				db.set("warns", newObj)
			}
		})

		function sendString(content) {
			if (type == "SLASH") {
				base.reply(content)
			} else {
				base.channel.send(content)
			}
		}

		function warning(value) {
			const { MessageEmbed } = require("discord.js")
			const e = new MessageEmbed()
				.setColor('#2f3136')
				.setDescription(warnMessage + "<:Benched:868094337760759818>(muted).\nREAD THE [RULES](https://canary.discord.com/channels/759383560095793162/876345175075594240/881911746015658005) " + (4 - value).toString() + " Warnings left")
			if (type == "SLASH") {
				base.reply({ embeds: [e] })
			} else {
				base.channel.send({ embeds: [e] })
			}
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
