const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#ff004a')
        .setThumbnail(bicon)
        .setTitle('Tu souhaites voter pour notre bot ?')
        .addField(
            'Voter pour SLOAD:',
            '[voter](https://discordbots.org/bot/620163110371721216)'
        )
        .setFooter('SLOAD | BY SKLAZ')

    message.channel.send(embed)

    message.delete()
}

module.exports.help = {
    name: 'vote',
}
