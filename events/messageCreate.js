module.exports = (client, message) => {
	try{
    if (message.author.bot) return;
		require("./../src/verifyHandler")(client, message)

    const prefix = client.config.prefix
    const Discord = require('discord.js');
    const fs = require("fs")

		function makeToken() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
      var charactersLength = characters.length;
      for ( var i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
		    }
		    return result;
		  }

		
		// if (message.content.includes("discord.gg/")){
		// 	const token = makeToken()
		// 		message.channel.send(`${message.author}, Verification required\nPlease retype this string of charactars: \`${token}\`\nThis session expires in \`2 Mins\``)
		// 		message.delete()
			
		// 		const filter = m => m.content.includes(token)
			
		// 		message.channel.awaitMessages({ filter, max: 4, time: 120_000, errors: ['time'] })
		// 		  .then(collected => {
		// 				message.channel.send("Access granted for 30 Mins")
		// 			})
		// 		  .catch(collected => message.channel.send("Session Expired"));
		// 		return 
		// }
   fs.readdir('./msgChk/', (err, files) => {
        files.forEach(file => {
            require(`../msgChk/${file}`)(message, client)
        });
    });

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    var admin = false
    var dm = false
    var channelOwner = false

    if (!cmd) return;
    if (message.channel.owner) {
        if (message.author.id == message.channel.owner) {
            channelOwner = true
        }
    }
        if (message.member.permissions.has('MANAGE_GUILD')) {
            admin = true;
        }
    cmd.run(client, message, args, Discord, admin, channelOwner);
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}