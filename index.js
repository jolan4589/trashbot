fs = require('fs')

// Requires
const Discord = require('discord.js')
const Utils = require('./srcs/js/utils.js')
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
		if (RegExp('^' + bot_inf.pre).test(msg.content)) {
			if (RegExp('^.{1}rlist$').test(msg.content)) Role.sendRoleList(msg)
			else if (RegExp('^.{1}rsend').test(msg.content)) Role.sendToRoleOwners(msg)
			else if (RegExp('^.{1}pp$').test(msg.content)) msg.channel.send(msg.author.displayAvatarURL())
		}
		else if (RegExp('^test').test(msg.content)) {
			Utils.test(msg)
		}
	}
})