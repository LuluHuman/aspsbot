var list = new Map()

list.set("710069289897426974", ["deez","nuts", "𒅌", "𒅌𒅌"])
list.set("282899277376913409", ["lol"])
module.exports = (message, client) => {
	try{
    const info = list.get(message.author.id)
    const words = message.content.split(/ +/g);
    var match = false

    if (!info) return

    info.forEach((blackWord) => {
        if (match == false) {
            words.forEach(function (word) {
                if (word.toLowerCase() == blackWord) {
                    message.reply("<@635303930879803412> has prevented you from using this word")
                    message.delete()
                    saycussword = true
                }
            })
        }
    })
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}