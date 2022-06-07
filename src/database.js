const fs = require("fs")

exports.get = (db,func) => {
	try{
	fs.readFile(`./Database/${db}.json`, 'utf8', func);
		} catch (err) {
		console.log(`
┌[ERROR]
├╴Error: ${err}
└Location: ${__filename}`)
	}
}

exports.set = (db, newdata) => {
	try{
	fs.writeFile(`./Database/${db}.json`, JSON.stringify(newdata), function writeJSON(err) {
		if (err) return console.log(err);
	});
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
