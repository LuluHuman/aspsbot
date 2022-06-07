module.exports = async (client,user) => {
try{
  client.channels.cache.get("#logs").send(`<@${user.id}> has joined. They will make hell with us`)
		try{
			user.send(`
			Welcome to *Middle_School_Name UnOffical Server. Read <#Rules>. 
			Sabotaging is a serious offence if you are caught sabotaging you will be kicked.
			Please <#> (it is required for security purposes)
			`)
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}