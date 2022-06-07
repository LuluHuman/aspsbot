module.exports = async (client) => {
	try {
		const { get } = require("axios")
		const { data } = await get('https://www.timeapi.io/api/Time/current/zone?timeZone=Singapore')
		const time = `${data.date} ${data.time}`
		client.time = time
		client.user.setActivity("over Angsana  up since: " + time, { type: "WATCHING" })
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
