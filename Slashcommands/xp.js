const { SlashCommandBuilder, Embed } = require("@discordjs/builders")
const { MessageEmbed, MessageAttachment } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("xp")
		.setDescription("get your xp"),
	async execute(inter, client) {
		try {
			const fs = require("fs")
			const path = require('path')
			const { createCanvas, Canvas, Image, registerFont } = require('canvas')
			const db = require("./../src/database.js")
			const authUser = inter.user
			db.get("xp", function(err, obj) {
				inter.deferReply();
				obj = JSON.parse(obj)

				function RandomNumber(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
				if (!obj[authUser.id]) {
					const newObj = obj
					newObj[authUser.id] = RandomNumber(15, 25)
					db.set("xp", newObj)
					return
				}
				const xp = obj[authUser.id]
				registerFont(path.join(__dirname, '../config/', "Arial.ttf"), { family: 'Arial' })

				fs.readFile('./config/xp.png', async function(err, image) {
					if (err) { console.error(err); return; }

					const img = new Image();
					img.src = image;
					canvas = createCanvas(img.width, img.height);
					ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0, img.width, img.height);
					ctx.fillStyle = 'White';
					ctx.textAlign = 'left';

					ctx.font = '50pt Arial';

					var lvl = 0
					if (xp >= 1000 && xp < 2000) { lvl = 1 }
					if (xp >= 2000 && xp < 4000) { lvl = 2 }
					if (xp >= 4000 && xp < 5000) { lvl = 3 }
					if (xp >= 5000 && xp < 6000) { lvl = 4 }
					if (xp >= 6000 && xp < 8000) { lvl = 5 }
					if (xp >= 8000 && xp < 9000) { lvl = 6 }
					if (xp >= 9000 && xp < 10000) { lvl = 7 }
					if (xp >= 10000 && xp < 11000) { lvl = 8 }
					if (xp >= 11000 && xp < 12000) { lvl = 9 }
					if (xp >= 12000) { lvl = 10 }

					ctx.fillText(`${authUser.username}#${authUser.discriminator}`, 550, 115);
					ctx.fillText(`Lvl: ${lvl}`, 550, 245);

					let newLvl = lvl + 1
					var xpNeeded
					if (newLvl == 1) { xpNeeded = 1000 }
					if (newLvl == 2) { xpNeeded = 2000 }
					if (newLvl == 3) { xpNeeded = 4000 }
					if (newLvl == 4) { xpNeeded = 5000 }
					if (newLvl == 5) { xpNeeded = 6000 }
					if (newLvl == 6) { xpNeeded = 8000 }
					if (newLvl == 7) { xpNeeded = 9000 }
					if (newLvl == 8) { xpNeeded = 10000 }
					if (newLvl == 9) { xpNeeded = 11000 }
					if (newLvl == 10) { xpNeeded = 12000 }


					ctx.fillText(`Xp: ${xp}/ ${xpNeeded}`, 550, 405);

					var avatar = new Image();
					avatar.src = authUser.displayAvatarURL({ format: 'png' });

					setTimeout(function() {
						ctx.drawImage(avatar, 70, 20, 400, 400);
						buf = canvas.toBuffer();

						const attachment = new MessageAttachment(buf, "xp.png")
						inter.editReply({
							content: "Leaderboard: https://asps.mason-bot.xyz/rank",
							files: [attachment]
						})
					}, 1000)
				})

			})
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}
}