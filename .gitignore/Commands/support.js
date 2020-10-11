const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#00ffd2')
        .setThumbnail(bicon)
        .setTitle('Support Info')
        .addField('Pour voir les commandes du bot', '`s!help`')
        .addField('Pour signaler un soucis', '`s!contact`')
        .addField(
            "Si vous avez besoin d'aide pour autre chose",
            '[Support Serveur](https://discord.gg/8bB6C3q)'
        )
        .addField('Notre site web', '[Site Web](https://sloadbot.fr)')
        .setFooter('SLOAD | BY SKLAZ')

    message.channel.send(embed)

    message.delete()
}

module.exports.help = {
    name: 'support',
}
