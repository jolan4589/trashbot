fs = require('fs')

// Root path
global.ROOT = require('path').resolve(__dirname)

// Requires
const Discord = require('discord.js')
const Utils = require(`${ROOT}/srcs/js/utils.js`)
const Help = require(`${ROOT}/srcs/js/help.js`)
const Role = require(`${ROOT}/srcs/js/role.js`)
const emb = require(`${ROOT}/srcs/json/embed.json`)

// Bot
const bot = new Discord.Client()
const bot_inf = require(`${ROOT}/srcs/json/bot.json`)

// Global variable
pages = []

bot.login(bot_inf.login)

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
	let pre = Object.keys(bot_inf.pre).includes(msg.guild.id) ? bot_inf.pre[msg.guild.id]: bot_inf.pre.base
	if (msg.author.id != bot_inf.id) {
		if (RegExp(`^${pre.bot}`).test(msg.content)) {
			// Role
			if (RegExp(`^.{${pre.bot.length}}${pre.role}list$`).test(msg.content)) Role.sendRoleList(msg)
			else if (RegExp(`^.{${pre.bot.length}}${pre.role}send`).test(msg.content)) Role.sendToRoleOwners(msg)

			// Other
				// Profile picture
			else if (RegExp(`^.{${pre.bot.length}}pp$`).test(msg.content)) msg.channel.send(msg.author.displayAvatarURL())
				// Help
			else if (RegExp(`^.{${pre.bot.length}}help`).test(msg.content)) Help.sendFirstMessage(msg.channel)
		}
		else if (RegExp('test').test(msg.content)) {
			console.log(Utils.save({MDR:"j'aime les trains"}, 'test'))
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
		if (reaction.users.cache.find(elem => elem != bot_inf.id)) {			
			for (let elem of pages) {
				if (Object.values(elem).find(element => element == reaction.emoji.name)) Help.edithelp(reaction, elem)
			}
			
			
			/*page.forEach(element => {
				for (let [key, value] of Object.entries(element)) {
					console.log(`${key}: ${value}`)
				}
			});*/
			

			/*if (reaction.emoji.name == '1⃣') Utils.edithelp(reaction, 1)
			else if (reaction.emoji.name == '2⃣') Utils.edithelp(reaction, 2)
			else if (reaction.emoji.name == '3⃣') Utils.edithelp(reaction, 3)
			else if (reaction.emoji.name == '0⃣') Utils.edithelp(reaction, 0)*/
			//reaction.message.edit('', {embed:texts.help[1]})
		}
		//console.log(reaction)
		// Now the message has been cached and is fully available
		//console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
		// The reaction is now also fully available and the properties will be reflected accurately:
		//console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
})