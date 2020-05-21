fs = require('fs')

// Requires
const Discord = require('discord.js')
const Utils = require('./srcs/js/utils.js')
const Help = require('./srcs/js/help.js')
const Role = require('./srcs/js/role.js')

// Bot
const bot = new Discord.Client()
const bot_inf = require('./srcs/json/bot.json')

bot.login(bot_inf.login)

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
	if (msg.author.id != bot_inf.id) {
		if (RegExp('^' + bot_inf.pre.bot).test(msg.content)) {
			// Role
			if (RegExp(`^.{${bot_inf.pre.bot.length}}${bot_inf.pre.role}list$`).test(msg.content)) Role.sendRoleList(msg)
			else if (RegExp(`^.{${bot_inf.pre.bot.length}}${bot_inf.pre.role}send`).test(msg.content)) Role.sendToRoleOwners(msg)

			// Other
				// Profile picture
			else if (RegExp(`^.{${bot_inf.pre.bot.length}}pp$`).test(msg.content)) msg.channel.send(msg.author.displayAvatarURL())
				// Help
			else if (RegExp(`^.{${bot_inf.pre.bot.length}}help`).test(msg.content)) Help.sendFirstMessage(msg.channel)
		}
		else if (RegExp('test').test(msg.content)) {
			let pages = []
			let i = 0
			Object.keys(bot_inf.pre).forEach(function(z) {
				pages[i] = {[z]: `${i}⃣`}
				i += 1
			})
			msg.channel.send(pages)
			console.log(pages)
		}
	}
})

bot.on('messageReactionAdd', async (reaction, user) => {
		// When we receive a reaction we check if the reaction is partial or not
		if (reaction.partial) {
			// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
			try {
				await reaction.fetch();
			} catch (error) {
				console.log('Something went wrong when fetching the message: ', error);
				// Return as `reaction.message.author` may be undefined/null
				return;
			}
		}
		//console.log(reaction.message.reactions.cache)
		if (reaction.users.cache.find(elem => elem != bot_id)) {
			if (reaction.emoji.name == '1⃣') Utils.edithelp(reaction, 1)
			else if (reaction.emoji.name == '2⃣') Utils.edithelp(reaction, 2)
			else if (reaction.emoji.name == '3⃣') Utils.edithelp(reaction, 3)
			else if (reaction.emoji.name == '0⃣') Utils.edithelp(reaction, 0)
			//reaction.message.edit('', {embed:texts.help[1]})
		}
		//console.log(reaction)
		// Now the message has been cached and is fully available
		//console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
		// The reaction is now also fully available and the properties will be reflected accurately:
		//console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
})