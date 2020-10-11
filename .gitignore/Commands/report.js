const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    )
    if (!rUser)
        return message.channel.send("Impossible de trouver l'utilisateur !")
    let reason = args.join(' ').slice(22)

    let reportEmbed = new Discord.RichEmbed()
        .setDescription('Signaler')
        .setColor('#E5DA2A')
        .addField('Utilisateur Signaler', `${rUser} ID: ${rUser.id}`)
        .addField('Signaler Par', `${message.author} ID: ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Temps', message.createdAt)
        .addField('Raison', reason)

    //return message.channel.send(reportEmbed); //send msg in current channel
    let reportsChannel = message.guild.channels.find(`name`, 'report-user') //TODO: set reports channel
    if (!reportsChannel)
        return message.channel.send(
            'Impossible de trouver le channel **report-user** !' +
                ' ou créé un channel nommé **report-user** !'
        )

    message.delete().catch((O_o) => {}) //delete previous message (input command)

    return reportsChannel.send(reportEmbed)
}

module.exports.help = {
    name: 'report',
}