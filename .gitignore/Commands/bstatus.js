const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#ff004a')
        .setThumbnail(bicon)
        .setTitle('Tu souhaites voir le statut de SLOAD ?')
        .addField(
            'Statut de SLOAD:',
            '[Voir](https://status.sloadbot.fr)'
        )
        .setFooter('SLOAD | BY SKLAZ')

    message.channel.send(embed)

    message.delete()
}

module.exports.help = {
    name: 'bstatut',
}