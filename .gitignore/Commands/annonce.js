const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription(
                '📛 Vous ne disposez pas les permissions nécessaires pour effectuer cette commande.'
            )
            .setColor('#F43436')
        message.channel.send(error_permissions)
    }
    if (message.member.hasPermission('MANAGE_GUILD')) {
        let arg = message.content.split(' ').slice(1)
        let contenu = arg.join(' ')
        if (!args[0])
            return message.channel.send(
                '❗ Votre syntaxe est incorrecte. \n```Syntaxe : s!annonce <Description>```'
            )
        var annonce = new Discord.RichEmbed()
            .setTitle('📌 __Annonce :__')
            .setDescription(contenu)
            .setColor('#00fff4')
            .setFooter('SLOAD | BY SKLAZ')
        message.channel.send(annonce)
        message.delete()
    }
}

module.exports.help = {
    name: 'annonce',
}
