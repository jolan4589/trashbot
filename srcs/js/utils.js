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

exports.save = function(content, file) {
	const files = {
		bot: `${ROOT}/srcs/json/bot.json`,
		embed: `${ROOT}/srcs/json/embed.json`,
		test: `${ROOT}/testfile.txt`,
		rpg: `${ROOT}/srcs/json/rpg.json`
	}
	if (Object.keys(files).includes(file)) {
		if (file == 'rpg'){
			let rpg = require(`${ROOT}/srcs/json/rpg.json`)
			let servID = Object.keys(content)[0]
			let playerID = Object.keys(content[servID])[0]
			if (Object.keys(rpg).includes(servID)){
				if (Object.keys(rpg[servID]).includes(playerID)){
					rpg[servID][playerID] = content[servID][playerID]
				}
				else {
					rpg[servID] = Object.assign(rpg[servID], content[servID])
				}
			}
			else {
				rpg = Object.assign(rpg, content)
			}
			fs.writeFile(files[file], JSON.stringify(rpg, null, 4), err => {
				if (err) {
					Utils.errorMessage('Error writting in ' + files[file])
					return false
				}
				else {
					console.log('Success wrote in ' + files[file])
				}
			})
			return true
		}
		else {
			fs.writeFile(files[file], JSON.stringify(content), err => {
				if (err) {
					Utils.errorMessage('Error writting in' + files[file])
					return(false)
				}
				else {
					console.log('Success wrote in' + files[file])
				}
			})
			return(true)
		}
	}
	else {
		console.log(`Error find file. Try with one of thoses : ${Object.keys(files)}`)
		return(false)
	}
}