const Discord = require('discord.js')

//ban command

module.exports.run = async (bot, message, args) => {
    let xdemb = new Discord.RichEmbed()
        .setColor('#ebff00')
        .setTitle('Commande de ban')
        .addField('Description:', `Bannir un membre`, true)
        .addField('Usage:', `s!ban [user] [reason]`, true)
        .addField('Exemple:', `s!ban @Odar spam`)

    if (
        !message.member.hasPermission('BAN_MEMBERS') &&
        message.author.id !== '490458230854778910'
    )
        return message.channel.send(
            "Désolé, vous n'avez pas la permission d'utiliser ceci !"
        )

    let member = message.mentions.members.first()
    if (!member) return message.channel.send(xdemb)
    if (!member.bannable)
        return message.channel.send('Je ne peux pas bannir cet utilisateur !')
    if (member.user.id === '490458230854778910')
        return message.channel.send('Je ne peux pas ban mon propriétaire !')

    if (member.id === message.author.id)
        return message.channel.send('Vous ne pouvez pas vous bannir')

    let reason = args.slice(1).join(' ')

    if (!reason) {
        res = 'Aucune raison donnée'
    } else {
        res = reason
    }

    await member
        .ban(reason)
        .catch((error) =>
            message.channel.send(
                `Désolé, je peux pas bannir à cause de: ${error}`
            )
        )

    let bean = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle(`Ban | ${member.user.tag}`)
        .addField('Utilisateur', member, true)
        .addField('Moderateur', message.author, true)
        .addField('Raison', res)
        .setTimestamp()
        .setFooter('SLOAD | BY SKLAZ')

    message.channel.send(bean)
}
module.exports.help = {
    name: 'ban',
}
