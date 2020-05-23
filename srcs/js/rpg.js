const Utils = require(`${ROOT}/srcs/js/utils.js`)

const rpg = require(`${ROOT}/srcs/json/rpg.json`)

exports.startGame = function(msg) {
	if (!Object.keys(rpg).includes(msg.guild.id)) {
		rpg = Object.defineProperty(rpg, `${msg.guild.id}`, {})
		if (!Utils.save(rpg, 'rpg')) return (0)
	}
	if (!Object.keys(rpg[msg.guild.id]).includes(msg.author.id)) {
		msg.channel.send({embed : {	}})
	}
	else {
		rpg = Object.defineProperty(rpg[msg.guild.id], `${msg.author.id}`, {})
		if (!Utils.save(rpg, 'rpg')) return (0)
	}
}