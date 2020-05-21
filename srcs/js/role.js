const emb = require(`${ROOT}/srcs/json/embed.json`)

exports.sendRoleList = function (msg) {
	tmp = emb.r
	tmp.fields[0].value = ""
	msg.guild.roles.cache.forEach(function (z) {
		tmp.fields[0].value += z.name + '\n'
	})
	msg.channel.send({ embed: tmp })
}

exports.sendToRoleOwners = function (msg) {
	let compt = 0
	let i = msg.content.indexOf('$', 4)
	let continu = true
	let roles = []
	while (continu) {
		let i2 = msg.content.indexOf('$', i + 1)
		if (i2 != -1) {
			roles.push(msg.content.slice(i + 1, i2))
			i = msg.content.indexOf('$', i2 + 1)
			if (i > -1) {
				if (!RegExp('^ *$').test(msg.content.slice(i2 + 1, i))) {
					continu = false
					i = i2
				}
			}
			else {
				i = i2 + 1
			}
		}
		else {
			continu = false
		}
	}
	if (msg.guild.roles.cache.find(elem => roles.includes(elem.name))) {
		let message = msg.content.slice(i).trim()
		msg.guild.members.cache.forEach(function (z) {
			if (z.roles.cache.find(elem => roles.includes(elem.name))) {
				z.send(message)
				compt += 1
			}
		})
		msg.channel.send(`Message envoyé à ${compt} personnes.`)
	}
}