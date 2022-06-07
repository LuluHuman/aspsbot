exports.router = (client) => {
	try{
  const { Router } = require('express');
  const db = require("./../src/database")

  const router = Router();

  router.use('/', (req, res) => {
    const url = req.url.toLowerCase().split("/")// result = db/something
    
    let guild = client.guilds.cache.get("759383560095793162");

    if (!guild) { res.send({ "errors": [{ "code": 404, "message": "NotFound" }] }) }
		db.get("log",function(err,data){
    	res.send({ status: 200, id: guild.id, name: guild.name, memberCount: guild.memberCount, region: guild.region, icon: guild.icon, log: data})
		})
  })

  return router
	
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
