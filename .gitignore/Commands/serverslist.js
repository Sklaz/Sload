const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let string = ''
    bot.guilds.forEach((guild) => {
        string += guild.name + '\n'
    })
    let bt = bot.user.username
    let botembed = new Discord.RichEmbed()
        .setColor('#000FF')
        .addField('SLOAD est dans les serveurs:', string)
        .setTimestamp()
        .setFooter('SLOAD | BY SKLAZ')
    message.channel.send(botembed)
}

module.exports.help = {
    name: 'servlist',
}
