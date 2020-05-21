const bot_inf = require('../json/bot.json')
const emb = require('../json/embed.json')

exports.sendFirstMessage = function (chan) {
	let pages = []
	let i = 0
	Object.keys(bot_inf.pre).forEach(function (z) {
		pages[i] = { [z]: `${i}⃣` }
		i += 1
	})
	chan.send({ embed: emb.help.bot })
		.then(message => {
			pages.forEach(elem => Object.keys(elem)[0] == 'bot' ? 0 : message.react(Object.values(elem)[0]))
		})
		.catch(function (error) {
			console.error(error);
		})
}

exports.edithelp = function (reaction, i) {
	emots = ['0⃣', '1⃣', '2⃣', '3⃣']
	reaction.message.react(emots.find(element => !reaction.message.reactions.cache.find(elem => element == elem.emoji.name)))
	reaction.message.reactions.cache.find(element => element.emoji.name == emots[i]).remove()
	reaction.message.edit('', { embed: emb.help[i] })
}