module.exports = (err, filepath) => {
	console.log(`
┌[ERROR]
├╴Error: ${err}
└Location: ${filepath}`)
}