const Discord = require('discord.js')
let days = 0
let week = 0

exports.run = (client, message, args) => {
    let uptime = ``
    let totalSeconds = client.uptime / 1000
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)

    if (hours > 23) {
        days = days + 1
        hours = 0
    }

    if (days == 7) {
        days = 0
        week = week + 1
    }

    if (week > 0) {
        uptime += `${week} semaines, `
    }

    if (minutes > 60) {
        minutes = 0
    }

    uptime += `${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes`

    let serverembed = new Discord.RichEmbed()
        .setColor('#868887')
        .addField('Le bot est en ligne depuis:', uptime)

    message.channel.send(serverembed)
}

module.exports.help = {
    name: 'btime',
}
