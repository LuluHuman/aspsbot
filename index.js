try {
	/*
		Last updated 31 December 2021
		Improved since
	*/
	console.log(`
*BOT_NAME_IN_ASCII
`)

	//Varables
	const fs = require("fs")
	const discord = require("discord.js")
	const client = new discord.Client({
		intents: [
			discord.Intents.FLAGS.GUILDS,
			discord.Intents.FLAGS.GUILD_MESSAGES,
			discord.Intents.FLAGS.GUILD_MEMBERS,
		]
	})

	//Client statments
	client.Slashcommands = new discord.Collection()
	client.SlashcommandsObj = []
	client.commands = new discord.Collection()
	client.xpTimer = new Map()
	client.config = require('./config/bot.json');
	client.emotes = require('./config/emojis.json');
	client.utility = {}

	//Loading handler
	var c = 0

	utility()
	function utility() {
		fs.readdir("./src/", (err, files) => {
			console.log("╭⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯╮")
			files.forEach(file => {
				if (!file.endsWith(".js")) return;
				c++
				var text = `│Loading[1/4] [🔧]Utility ${file} [${c}/${files.length}]`
				const chars = 72 -text.split("").length
				for (let i = 0; i < chars; i++) {
					text = text + " "
				}
				text = text + "│"
				console.log(text);
				let utilityName = file.split(".")[0];
				client.utility[utilityName] = require("./src/" + file)
			})
			c = 0
		})
		sCommand()
	}
	
	function sCommand() {
		fs.readdir('./Slashcommands/', (err, files) => {
			console.log("├⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯┤")
			if (err) return console.error(err);
			files.forEach(file => {
				if (!file.endsWith(".js")) return;
				c++
				var text = `│Loading[2/4] [/]Command ${file} [${c}/${files.length}]`
				const chars = 72 -text.split("").length
				for (let i = 0; i < chars; i++) {
					text = text + " "
				}
				text = text + "│"
				console.log(text);
				const command = require(`./Slashcommands/${file}`)
				client.SlashcommandsObj.push(command.data.toJSON())
				client.Slashcommands.set(command.data.name, command);
			});
			c = 0
		});
		command()
	}

	function command() {
		fs.readdir('./commands/', (err, files) => {
			console.log("├⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯┤")
			if (err) return console.error(err);
			files.forEach(file => {
				c++
				if (!file.endsWith(".js")) return;
				let props = require(`./commands/${file}`);
				let commandName = file.split(".")[0];
				var text = `│Loading[3/4] [?]Command ${file} [${c}/${files.length}]`
				const chars = 72 -text.split("").length
				for (let i = 0; i < chars; i++) {
					text = text + " "
				}
				text = text + "│"
				console.log(text);
				client.commands.set(commandName, props);
			});
			c = 0
		});
		events()
	}

	function events() {
		fs.readdir('./events/', (err, files) => {
			c = 0
			console.log("├⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯┤")
			if (err) return console.error(err);
			files.forEach(file => {
				c++
				const event = require(`./events/${file}`);
				let eventName = file.split(".")[0];
				var text = `│Loading[4/4] [⭐]event ${file} [${c}/${files.length}]`
				const chars = 71 -text.split("").length
				for (let i = 0; i < chars; i++) {
					text = text + " "
				}
				text = text + "│"
				console.log(text);
				client.on(eventName, event.bind(null, client));
			});
			console.log("╰⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯╯")
		});
	}

	client.login(client.config.token)
} catch (err) { require("./config/errorHandler")(err, __filename) }
