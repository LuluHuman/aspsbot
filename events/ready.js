module.exports = (client) => {
	try{
    console.log(`[INFO] ${client.user.username} is ready`);

    client.user.setActivity("Loading")
    require("../src/uptime.js")(client)
    // [/]command backbone
    const Slashcommands = client.SlashcommandsObj
    const { REST } = require("@discordjs/rest")
    const { Routes } = require("discord-api-types/v9")
    const clientId = client.user.id

    const rest = new REST({
        version: "9"
    }).setToken(client.config.token);

    (async() => {
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, "759383560095793162"), {
                body: Slashcommands
            })
            console.log(`[INFO] Slash Commands is registered`)
        } catch (err) {
            if (err) {
                console.log(err)
            }
        }
    })()
    //[Web] Backbone
    require("../webServerHandler")(client)
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}