module.exports = (message, client) => {
	try{
    if (client.disableAnoyance == true) { return }

    const joelurl = "https://canary.discord.com/api/webhooks/880048114269040661/KDHx9IjYducUG-l9QyoTwPm_e6cSxpWgNhEq5sg-N6h9vQt3g2SEmIiYBFdmsLWv8Ern"
    const ziqianurl = "https://canary.discord.com/api/webhooks/880048716856320000/PAB7byD5fbtJHZ14UjhMOtwBKGd2nT9VrPk3zEQbZ9_GCGLQP8IfnXXWz6o95aKe1NsG"
    const aaryanurl = "https://canary.discord.com/api/webhooks/905007856846266398/LRRgFQ_-Ut_JgUh8d_wChBVq1fEIsqzbg5CNq-28qRWy1vqLDS9EVZ_EWNJFwLU8pRjJ"

    function send(rawMsg, url) {
			const axios = require("axios")
        const whurl = url + "?wait=true"
        const msg = {
            "content": rawMsg
        }

        axios.post(whurl, msg)
    }
    //                          Girlfriend                                      Teacher
    if (message.author.bot || message.author.id == "869531039729586196" || message.author.id == "876037129766072330") return;

    if (message.channel.id != "898878055626461216") { return }

    const words = message.content.toLowerCase().split(/ +/g);

    words.forEach(function(word) {
        if (word.toLowerCase() == "what" || word.toLowerCase() == "wat" || word.toLowerCase() == "wht" || word.toLowerCase() == "whats") { //triggers: what wat wht whats
            const table = ["ni ama fried chicken <:NiAma_Fried_Chicken:870698656301477968>", "Your mother circular mentos"]

            function RandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            send(table[RandomNumber(0, 1)], joelurl)
            return
        } else if (word.toLowerCase() == "why") {
            send("Tell me why? Ain't nothin' but a heart ache", joelurl)
            return
        } //Joel Handler

        if (word.toLowerCase() == "who" || word.toLowerCase() == "whos" || word.toLowerCase() == "who's") { //triggers: who whos who's
            if (message.content.toLowerCase().match("my mom")) { //trigger: who is my mom
                send("You dont even know your mom sad\nhttps://cdn.discordapp.com/attachments/760767116566593606/873776486048485436/image0.jpg", ziqianurl)
                return
            }
            send("Your mom\nhttps://media1.tenor.com/images/f005e0d4fb70a8a4b30f45792e4aca36/tenor.gif?itemid=14206432", ziqianurl)
            return
        } //Zi Qian Handler

        if (word.toLowerCase() == "im") { // im ...
            send(`HELLO${message.content.toLowerCase().split("im")[1].toUpperCase()} IM AARYAN`, aaryanurl)
            return
        } else if (word.toLowerCase() == "i" && words[words.indexOf(word) + 1] == "am") { // i am ...
            send(`HELLO${message.content.toLowerCase().split("i am")[1].toUpperCase()} IM AARYAN`, aaryanurl)
            return
        } else if (word.toLowerCase() == "i'm") { //i'm ...
            send(`HELLO${message.content.toLowerCase().split("i'm")[1].toUpperCase()} IM AARYAN`, aaryanurl)
        } //Aaryan Handler

        //Statement does not meet requirements
    })
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}