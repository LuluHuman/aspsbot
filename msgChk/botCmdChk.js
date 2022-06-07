const prefixes = ["//", "owo ", "m:", "pls "]
module.exports = (message) => {
	try{
	if (message.author.bot || message.author.id == "635303930879803412") { return }
	if (message.channel.id == "876124286090371082" || message.channel.id == "761776324456611870" || message.channel.id == "770168273026285588" || message.channel.id == "925761838203932692" || message.channel.id == "925957326857465906" || message.channel.id == "925957371140931684") { return }
	prefixes.forEach(function(prefix) {
		if (message.content.toLowerCase().startsWith(prefix)) {
			message.channel.awaitMessages({ max: 1 })
				.then((msg) => {
					msg = msg.first()
					msg.delete()
					require("../src/warn.js")(message,"SYSTEM", "No bot commands in <#898878055626461216> go to <#761776324456611870>.I have no sympathy for your meme coins. i will leave you off with a warning and you will be", message.author)
					return
				})
		}
	})
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}