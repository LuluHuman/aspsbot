module.exports = (client) => {
	try{
    //Varables
    var database = new Map()
    const express = require('express');
    const path = require("path")
    const favicon = require('serve-favicon');
    const fs = require('fs');
    const admin = [
        "635303930879803412", "869531039729586196", "282899277376913409", "724976679436419144"
    ]
    const app = express();
    const bodyParser = require('body-parser')

    app.use('/oauth', require('./routers/OAuth2.js').router(database));
    app.use('/getRanks', require('./routers/getRanks.js').router(client));
    app.use('/getGuild', require('./routers/getGuild.js').router(client));
    app.use(favicon(__dirname + '/config/serverIcon.png'));
    app.use(bodyParser.json());
    app.listen(() => console.log("[INFO] Website is ready"));
    app.use(express.static(__dirname + '/client'));
    app.use('/', async(req, res) => {
        const url = req.url.toLowerCase();
        if (url == '/get') {
            const link = await client.channels.cache.get("876345175075594240").createInvite({ maxAge: 86400, maxUses: 1 });
            res.end("https://discord.gg/" + link.code);
            return
        }

        if (url == '/invite/direct') {
            const link = await client.channels.cache.get("876345175075594240").createInvite({ maxAge: 86400, maxUses: 1 });
            res.redirect("https://discord.gg/" + link.code);
            return
        }
        if (url == '/assets/servericon') { res.sendFile(path.join(__dirname + '/config/serverIcon.png')); return }
        if (url == '/invite') { res.sendFile(path.join(__dirname + '/client/html/invite.html')); return }
        if (url == '/rank') { res.sendFile(path.join(__dirname + '/client/html/rank.html')); return }
        if (url == '/dashboard') {
            var Cookies = require('cookies')
            var cookies = new Cookies(req, res)
            const UserData = database.get(cookies.get("token"))
            if (!UserData) { res.sendFile(path.join(__dirname + '/client/html/403.html')); return }

            admin.forEach((ids) => {
                if (UserData.id == ids) return res.sendFile(path.join(__dirname + '/client/html/dashboard.html'));
            })
            res.sendFile(path.join(__dirname + '/client/html/dashboard.html'));
            return
        }
        //OAuth2
        if (url.split("/")[0] == '/oauth' || url.split("/")[0] == "/getUser") { return }
        if (url.split("/")[0] == '/getGuild') { return }
        //404
        res.sendFile(path.join(__dirname + '/client/html/404.html'));
    });
	} catch (err) { require("./config/errorHandler")(err, __filename) }
}
