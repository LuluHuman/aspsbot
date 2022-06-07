exports.run = async (client, message, args, Discord) => {
try{
    if (args[0]) {
        message.delete()
        message.channel.send(args.join(" "));
    }else{
      message.channel.send("Cannot send empty messages Just like how a person must have a brain")
    }
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
exports.type = "fun"