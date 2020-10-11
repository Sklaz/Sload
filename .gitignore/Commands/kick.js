const Discord = require('discord.js')
const ops = require('../ops.json')
module.exports.run = async (bot, message = new Discord.Message(), args) => {
    if (
        !message.member.permissions.has('KICK_MEMBERS') &&
        !ops.includes(message.member.id)
    )
        return message.channel.send(
            "Désolé, vous n'avez pas la permission d'utiliser ceci !"
        )

    let usageEmbed = new Discord.RichEmbed()
        .setColor('#ebff00')
        .setTitle('Commande de kick')
        .addField('Description:', `Kick un membre`, true)
        .addField('Usage:', 's!kick [user] [reason]', true)
        .addField('Exemple:', 's!kick @Odar spam')

    let member = message.mentions.members.first()
    if (!member) return message.channel.send(usageEmbed)
    else if (!member.kickable)
        return message.channel.send('Je ne peux pas kick cet utilisateur !')
    else if (member.user.id === '490458230854778910')
        return message.channel.send('Je ne peux pas kick mon propriétaire !')
    let reason = args.slice(1).join(' ')
    if (!reason) res = 'Aucune raison donnée'
    else res = `${reason}`

    await member
        .kick(reason)
        .catch((error) =>
            message.reply(`Désolé, je peux pas kick à cause de: ${error}`)
        )

    let kickEmbed = new Discord.RichEmbed()
        .setColor(0xca3c3c)
        .setTitle(`Kick | ${member.user.tag}`)
        .addField('Utilisateur', member, true)
        .addField('Moderateur', message.author, true)
        .addField('Raison', res)
        .setTimestamp()
        .setFooter('SLOAD | BY SKLAZ')

    message.channel.send(kickEmbed)
}
module.exports.help = {
    name: 'kick',
}
