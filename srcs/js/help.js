const bot_inf = require(`${ROOT}/srcs/json/bot.json`)
const emb = require(`${ROOT}/srcs/json/embed.json`)

exports.sendFirstMessage = function (chan) {
	pages = []
	let i = 0
	Object.keys(bot_inf.pre).forEach(function (z) {
		pages[i] = { [z]: `${i}⃣` }
		i++
		i = i % 10
	})
	emb.help.bot.fields.find(elem => RegExp('summary', 'i').test(elem.name))

	chan.send({ embed: emb.help.bot })
		.then(message => {
			pages.forEach(elem => Object.keys(elem)[0] == 'bot' ?
				0 : (
					Object.keys(emb.help).find(element => element == Object.keys(elem)[0]) ?
						message.react(Object.values(elem)[0]) : 0
					)
			)
		})
		.catch(function (error) {
			console.error(error);
		})
}

exports.edithelp = function (reaction, elem) {
	reaction.message.react(Object.values(pages.find(element => !reaction.message.reactions.cache.find(elem => Object.values(element)[0] == elem.emoji.name)))[0])
	reaction.message.reactions.cache.find(element => element.emoji.name == Object.values(elem)[0]).remove()
	reaction.message.edit('', { embed: emb.help[Object.keys(elem)[0]] })
}

/*exports.edithelp = function (reaction, i) {
	emots = ['0⃣', '1⃣', '2⃣', '3⃣']
	reaction.message.react(emots.find(element => !reaction.message.reactions.cache.find(elem => element == elem.emoji.name)))
	reaction.message.reactions.cache.find(element => element.emoji.name == emots[i]).remove()
	reaction.message.edit('', { embed: emb.help[i] })
}*/