module.exports = async (client,user) => {
try{
  client.channels.cache.get("759383560095793165").send(`<@${user.id}> has joined. They will make hell with us`)
		try{
			user.send(`
			Welcome to Angsana UnOffical Server. Read <#876345175075594240>. 
			Sabotaging is a serious offence if you are caught sabotaging you will be kicked.
			Please <#> (it is required for security purposes)
			`)
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}