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
	pre = Object.keys(bot_inf.pre).includes(msg.guild.id) ? bot_inf.pre[msg.guild.id] : bot_inf.pre.base
	pre.botn = bot_inf.botname
	if (msg.author.id != bot_inf.id) {
		if (RegExp(`^${pre.bot}`).test(msg.content)) {
			// Role
			if (RegExp(`^${pre.bot}${pre.role}`).test(msg.content)) {
				if (RegExp(`list$`, 'i').test(msg.content)) Role.sendRoleList(msg)
				else if (RegExp(`^.{${pre.bot.length}}${pre.role}send`).test(msg.content)) Role.sendToRoleOwners(msg)
				else if (msg.content.length == pre.bot.length + pre.role.length) Help.sendFirstMessage(msg.channel, 'role')
			}
			// Lg	
			else if (RegExp(`^${pre.bot}${pre.lg}`).test(msg.content)) {
				if (msg.content.length == pre.bot.length + pre.lg.length) Help.sendFirstMessage(msg.channel, 'lg')
			}
			// Jrpg
			else if (RegExp(`^${pre.bot}${pre.jrpg}`).test(msg.content)) {
				if (msg.content.length == pre.bot.length + pre.jrpg.length) Help.sendFirstMessage(msg.channel, 'jrpg')
			}
			// Jdr zeub
			else if (RegExp(`^${pre.bot}${pre.zeub}`).test(msg.content)) {
				if (msg.content.length == pre.bot.length + pre.zeub.length) Help.sendFirstMessage(msg.channel, 'zeub')
			}
			// Other
			// Profile picture
			else if (RegExp(`^.{${pre.bot.length}}pp$`).test(msg.content)) msg.channel.send(msg.author.displayAvatarURL())
			// Help
			else if (RegExp(`^.{${pre.bot.length}}help$`).test(msg.content)) Help.sendFirstMessage(msg.channel)
		}
		else if (RegExp('test').test(msg.content)) {
			console.log('====================\nNew test\n====================')
		}
	}
})

bot.on('messageReactionAdd', async (reaction, user) => {
	pre = Object.keys(bot_inf.pre).includes(reaction.message.guild.id) ? bot_inf.pre[reaction.msg.guild.id] : bot_inf.pre.base
	pre.botn = bot_inf.botname
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
	}
})