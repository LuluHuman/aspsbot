exports.run = async (client, message, args, Discord) => {
	try {
		function RandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		if (args[0]) {

			var Output = ""
			args.forEach(function(word) {
				Output = Output + " " + word
			})

			if (RandomNumber(0, 3) == 3) {
				var res = "no"
			} else {
				var res = "yes"
			}
			const exampleEmbed = new Discord.MessageEmbed()
				.setColor(client.config.defcolor)
				.setTitle("Question: " + Output)
				.setDescription(res)
				.setTimestamp() 
				.setFooter('Felicity#0690', client.config.pfp);
			message.channel.send({ embeds: [exampleEmbed] })
			message.react(client.emotes.success)
		}
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "fun"