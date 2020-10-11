const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const config = require('./config.json')
client.config = config

client.commands = new Discord.Collection()

fs.readdir('./Commands/', (error, directory) => {
    if (error) {
        throw error
    }

    const files = directory.filter((file) => file.split('.').pop() === 'js')

    if (files.length < 1) {
        return console.log('Not any command found !')
    }

    files.forEach((file) => {
        const command = require(`./Commands/${file}`)
        console.log(`'${command.help.name}' command loaded !`)
        client.commands.set(command.help.name, command)
    })
})

fs.readdir('./Events/', (error, directory) => {
    if (error) {
        throw error
    }
    const files = directory.filter((file) => file.split('.').pop() === 'js')
    if (files.length < 1) {
        return console.log(`Not any event loaded`)
    }

    files.forEach((file) => {
        const event = require(`./Events/${file}`)
        const eventName = file.split('.')[0]
        console.log(`'${eventName}' event loaded !`)

        client.on(eventName, event.bind(null, client))
    })
})

client.login(config.token)