exports.router = (client) => {
	const { Router } = require('express');
	const db = require("./../src/database")
	const router = Router();

	var xps = ""
	var highest = ""
	var lb = []

	router.get('/', (req, res) => {
	var count = 0
		db.get("xp", function(err, value) {
			value = JSON.parse(value)
			for (let id in value) {
				let xp = value[id]
				xps = `${xps},${xp}`
			}
			xps = xps.split(",")
			xps.shift()

			while (xps[0]) {
				let max = Math.max(...xps)
				const index = xps.indexOf(max.toString());
				if (index > -1) {
					xps.splice(index, 1);
				}
				for (let id in value) {
					let xp = value[id]
					if (xp == max) {

						client.guilds.cache.get("759383560095793162").members.fetch().then((user) => {
							user = user.get(id)
							if (user != undefined) {
								const uname = user.nickname
								const pfp = `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}?size=256`
								lb[`${uname};${pfp}`] = xp
							}
							if (count == Object.keys(value).length) {
								res.end(JSON.stringify({ ...lb}))//NOTE TO SELF ... IS VARY VARY IMPORTANT
							}
							count++
						})
					}
				}
			}
		});
	});

	return router;
}