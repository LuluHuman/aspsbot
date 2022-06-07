module.exports = function(user,action){
	try{
	const d = new Date();
	let date = d.toString();
	const fs = require("fs")
	fs.readFile(`./Database/log.json`, 'utf8',function(err, data){
		data = JSON.parse(data)
		data[date] = {user, action}
		fs.writeFile(`./Database/log.json`, JSON.stringify(data), function writeJSON(err) {
			if (err) return console.log(err);
		});
	})
		} catch (err) { require("./../config/errorHandler")(err, __filename) }
	}