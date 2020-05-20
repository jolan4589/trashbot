fs = require('fs')

// Requires
const Discord = require('discord.js')


// Bot
const bot = new Discord.Client()
const bot_id = 691665384453177385
const botlogin = require('./srcs/json/bot.json').login

bot.login(botlogin)

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {})