const bot_inf = require(`${ROOT}/srcs/json/bot.json`)

function newServSetting(id) {

}

exports.setPrefix = function(msg) {
	if (!Object.keys(bot_inf.pre).includes(msg.guild.id)) newServSetting(msg.guild.id)
}