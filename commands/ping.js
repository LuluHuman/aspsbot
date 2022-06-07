exports.run = async(client, message, _, Discord) => {
    try {

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(client.config.defcolor)
            .setTitle("Info" + client.emotes.success)
            .setDescription(
						 `Ping: **${client.ws.ping}ms**
							Version: **V2 Release**
							Process Version: **${process.version}**
							Disocrd.js version: **V13**
							Up Since: **${client.time}**
							`)
            .setTimestamp()
            .setFooter('Felicity#0690', client.config.pfp);
        message.channel.send({
            embeds: [exampleEmbed]
        })
        message.react(client.emotes.success)
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "utility"