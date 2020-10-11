const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#ff004a')
        .setThumbnail(bicon)
        .setTitle('Tu souhaites inviter notre bot ?')
        .addField(
            'Inviter SLOAD:',
            '[inviter](https://discordapp.com/oauth2/authorize?client_id=620163110371721216&scope=bot&permissions=8)'
        )
        .setFooter('SLOAD | BY SKLAZ')

    message.channel.send(embed)

    message.delete()
}

module.exports.help = {
    name: 'binvite',
}
