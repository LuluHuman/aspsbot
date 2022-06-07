exports.run = async (client, message, args, Discord, admin) => {
 try {
    const db = client.utility.database
    const target = message.mentions.users.first();
		if (!target) {message.channel.send("Provide a person to warn"); return}
    const memberTarget = message.guild.members.cache.get(target.id);
    
    db.get("warns",function(err,obj){
			obj = JSON.parse(obj)
      message.react(client.emotes.success)
      var value = obj[memberTarget.id]
      if (!value) value = 0
      message.channel.send(`This user has ${value} warns`)
      
    });
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "moderation"