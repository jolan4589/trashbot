const bot_inf = require(`${ROOT}/srcs/json/bot.json`)

/**
 * Function :
 * 	This function return an int between 1 and max include.
 * @param {int} max 
 */
exports.getRandomInt = function (max) {
	return Math.floor(1 + Math.random() * Math.floor(max))
}

/**
 * function :
 * 	This function return tab witout duplicate values
 * @param {*} tab 
 */
exports.removeDuplicates = function (a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
}

exports.test = function (msg) {
	msg.channel.send('coucou')
}

exports.embMessage = function (title, value) {
	return (
		{
			embed: {
				color: 8913151,
				footer: {
					text: `${bot_inf.botname} bot developped by jolan4589`,
					icon_url: "https://cdn.discordapp.com/avatars/691665384453177385/04abc2348c9b22ef57463bcfbf37d059.webp"
				},
				title: `__**${title} :**__`,
				description: `${value}`
			}
		}
	)
}

exports.save = function (content, file) {
	const files = {
		bot: `${ROOT}/srcs/json/bot.json`,
		embed: `${ROOT}/srcs/json/embed.json`,
		test: `${ROOT}/testfile.txt`,
		rpg: `${ROOT}/srcs/json/rpg.json`
	}
	if (Object.keys(files).includes(file)) {
		fs.writeFile(files[file], JSON.stringify(content), err => {
			if (err) {
				Utils.errorMessage('Error writting in' + files[file])
				return (false)
			}
			else {
				console.log('Success wrote in' + files[file])
			}
		})
		return (true)
	}
	else {
		console.log(`Error find file. Try with one of thoses : ${Object.keys(files)}`)
		return (false)
	}
}