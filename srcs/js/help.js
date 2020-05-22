const bot_inf = require(`${ROOT}/srcs/json/bot.json`)
const emb = require(`${ROOT}/srcs/json/embed.json`)

function fillSummary(page) {
	if (emb.help[page].fields[emb.help[page].fields.findIndex(elem => /summary/i.test(elem.name))].value == "") {
		pages.forEach((elem, i)=> {
			if (Object.keys(emb.help).includes(Object.keys(elem)[0])) {emb.help[page].fields[
				emb.help[page].fields.findIndex(elem => /summary/i.test(elem.name))
			].value += `${i} - ${Object.keys(elem)}\n` 
		}})
	}
}

exports.sendFirstMessage = function (chan, page = 'bot') {
	pages = []
	let i = 0
	Object.keys(pre).forEach(function (z) {
		pages[i] = { [z]: `${i}⃣` }
		i++
		i = i % 10
	})

	if (!Object.keys(emb.help).includes(page)) {
		console.log(`Couldn't find help page : ${page}. Try one of ${Object.keys(emb.help)}.`)
		return (0)
	}

	fillSummary(page)

	chan.send({ embed: emb.help[page] })
		.then(message => {
			pages.forEach(elem => Object.keys(elem)[0] == page ?
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
	fillSummary(Object.keys(elem)[0])
	reaction.message.edit('', { embed: emb.help[Object.keys(elem)] })
}