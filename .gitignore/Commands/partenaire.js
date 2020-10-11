const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#7d3c98')
        .setThumbnail(bicon)
        .setTitle('Partenaire de SLOAD')
        .addField('Nom du partenaire', '`xemcia`')
        .addField(
            'Serveur discord de xemcia',
            '[xemcia discord](https://discord.gg/agjvXaN)'
        )
        .addField('Site web', '[Site Web](https://xemcia.tk)')
        .setFooter('SLOAD | BY SKLAZ')

    message.author.send(embed)
    message.channel.send(
        `${message.author} Les partenaires ont été envoyé en message privé !`
    )

    message.delete()
}

module.exports.help = {
    name: 'partenaire',
}
