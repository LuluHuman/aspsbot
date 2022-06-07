exports.run = async (client, message, args, { MessageEmbed }) => {
	try {
		const fs = require("fs")											//specify fs
		var fun = "**Fun:\n** "
		var utility = "\n**Utility: \n** "
		var moderation = "**\nModeration: \n** "
		var music = "\n**Music: \n**  "

		fs.readdir('./commands/', (err, files) => {        //goes through ./commands/
			if (err) return console.error(err);			         //if got error log it out
			files.forEach(file => {                          //loops though the files
				if (!file.endsWith(".js")) return;           //if is a .js file
				let commandName = file.split(".")[0];        //split file's . (hentai.js > [hentai,js] ) and gets the fiest name (hentai)
				let props = require(`./../commands/${file}`);//a prop for getting info
				if (props.type == "fun") { fun = fun + commandName + " " } else
					if (props.type == "utility") { utility = utility + commandName + " " } else
						if (props.type == "moderation") { moderation = moderation + commandName + " " } else
							if (props.type == "music") { music = music + commandName + " " }
			});
			const exampleEmbed = new MessageEmbed()			   	 //make embed
				.setColor('#00aa00')
				.setTitle('Commands')
				.setDescription(fun + utility + moderation + music)
			message.channel.send({ embeds: [exampleEmbed] })	// anden send 
		});
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "utility"