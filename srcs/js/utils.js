/**
 * Function :
 * 	This function return an int between 1 and max include.
 * @param {int} max 
 */
exports.getRandomInt = function (max) {
	return Math.floor(1 + Math.random() * Math.floor(max));
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

exports.edithelp = function (reaction, i) {
	emots = ['0⃣', '1⃣', '2⃣', '3⃣']
	reaction.message.react(emots.find(element => !reaction.message.reactions.cache.find(elem => element == elem.emoji.name)))
	reaction.message.reactions.cache.find(element => element.emoji.name == emots[i]).remove()
	reaction.message.edit('', { embed: texts.help[i] })
}

exports.test = function (msg) {
	msg.channel.send('coucou')
}