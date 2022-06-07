module.exports = async(client, inter) => {
	try{
    if (!inter.isCommand()) return

    const command = client.Slashcommands.get(inter.commandName)

    if (!command) return

    try {
        await command.execute(inter, client)
    } catch (err) {
        if (err) {
            console.log(err)
        }

        inter.reply({
            content: `An error has occurred \${client.emotes.error} error: \n${err}`,
            ephemeral: true
        })
    }
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}