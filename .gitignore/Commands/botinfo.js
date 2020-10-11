const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let inline = true
    let bicon = bot.user.displayAvatarURL
    let usersize = bot.users.size
    let chansize = bot.channels.size
    let servsize = bot.guilds.size
    let botembed = new Discord.RichEmbed()
        .setColor('#ff6b00')
        .setThumbnail(bicon)
        .addField('Nom du bot', `🤖 ${bot.user.username}`, inline)
        .addField('Créateur du bot', '👑 <@490458230854778910>', inline)
        .addField('Serveurs', `🛡 ${servsize}`, inline)
        .addField('Channels', `📁 ${chansize}`, inline)
        .addField('Utilisateurs', `👤 ${usersize}`, inline)
        .addField('Staff du bot', '⚜️ <@490458230854778910>', inline)
        .addField(
            'Créé le',
            new Date(bot.user.createdAt)
                .toISOString()
                .replace('T', ' à ')
                .replace('Z', '')
        )
        .setFooter(`SLOAD | BY SKLAZ`)
        .setTimestamp()

    message.channel.send(botembed)
}

module.exports.help = {
    name: 'botinfo',
}
