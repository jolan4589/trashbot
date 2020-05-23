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
	else {
		console.log(`Error find file. Try with one of thoses : ${Object.keys(files)}`)
		return(false)
	}
}