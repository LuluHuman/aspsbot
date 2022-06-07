module.exports = async (client,user) => {
try{
  client.channels.cache.get("759383560095793165").send(`<@${user.id}> left. They betrayed us`)
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}