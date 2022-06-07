exports.isOwner = (user) => {
	try {
		if (!user) return undefined
		if (user.id == "635303930879803412") { return true }
		else { return false }
		return undefined
	} catch (err) {
		console.log(`
┌[ERROR]
├╴Error: ${err}
└Location: ${__filename}`)
	}
}
exports.isMod = (user) => {
	try {
		if (!user) return undefined
		if (user.roles.cache.has('867295894512730132')) { return true }
		else { return false }
		return undefined
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
