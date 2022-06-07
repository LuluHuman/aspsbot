module.exports = async (message, client) => {
	try {
		if (message.author.bot) return
		const db = require("./../src/database.js")
		//
		function RandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		//
		db.get("xp", function(err, obj) {
			try {
				obj = JSON.parse(obj)
				if (!obj[message.author.id]) {
					const newObj = obj
					newObj[message.author.id] = RandomNumber(15, 25)
					db.set("xp", newObj)
					return
				}
				const xp = obj[message.author.id]

				///
				if (client.xpTimer.get(message.author.id) == false) return

				const newObj = obj
				newObj[message.author.id] = xp + RandomNumber(15, 25)
				db.set("xp", newObj)

				db.get("xp", function(err2, newObj2) {
					const newXp = newObj2[message.author.id]
					if (newXp >= 1000 && newXp < 1040) { message.channel.send(`${message.author.username} has reached lvl 1! `) }
					if (newXp >= 2000 && newXp < 2040) { message.channel.send(`${message.author.username} has reached lvl 2! `) }
					if (newXp >= 4000 && newXp < 4040) { message.channel.send(`${message.author.username} has reached lvl 3! `) }
					if (newXp >= 5000 && newXp < 5040) { message.channel.send(`${message.author.username} has reached lvl 4! `) }
					if (newXp >= 6000 && newXp < 6040) { message.channel.send(`${message.author.username} has reached lvl 5! `) }
					if (newXp >= 8000 && newXp < 8040) { message.channel.send(`${message.author.username} has reached lvl 6! `) }
					if (newXp >= 9000 && newXp < 9040) { message.channel.send(`${message.author.username} has reached lvl 7! `) }
					if (newXp >= 10000 && newXp < 10040) { message.channel.send(`${message.author.username} has reached lvl 8! `) }
					if (newXp >= 11000 && newXp < 11040) { message.channel.send(`${message.author.username} has reached lvl 9! `) }
					if (newXp >= 12000 && newXp < 12040) { message.channel.send(`${message.author.username} has reached MAX LVL!!! `) }
				})
				client.xpTimer.set(message.author.id, false)

				setTimeout(function() {
					client.xpTimer.set(message.author.id, true)
				}, 60000)
			} catch (err) { require("./../config/errorHandler")(err, __filename) }
		})
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}