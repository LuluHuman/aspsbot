module.exports = async (client,user) => {
try{
  client.channels.cache.get("#logs").send(`<@${user.id}> left. They betrayed us`)
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}