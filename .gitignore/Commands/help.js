const Discord = require('discord.js')

exports.run = (client, message, args) => {
    let help = new Discord.RichEmbed()
        .setTitle('🌐 • Listes des commandes disponibles :')
        .addField(
            '⚡ • __Administration__ :white_check_mark:',
            '`annonce`, `botmp`, `say`'
        )
        .addField(
            '⚠️ • __Modération__ :white_check_mark:',
            '`clear`, `ban`, `kick`, `warn`, `unwarn`, `seewarn`, `sondage`'
        )
        .addField(
            '🔨 • __Utilitaires__ :white_check_mark:',
            '`help`, `ping`, `avatar`, `botinfo`, `infoserv`, `stats`, `servlist`, `membercount`, `binvite`, `report`, `btime`, `support`, `contact`, `vote`, `welcome`, `bstatut`'
        )
        .addField(
            '🎮 • __Divertissement__ :white_check_mark:',
            '`aucune commande ici`'
        )
        .addField(
            '🎞️ • __Fun__ :white_check_mark:',
            '`blague`, `password`, `meteo`'
        )
        .setThumbnail(
            `https://image.noelshack.com/fichiers/2020/11/5/1584115163-checklist2.png`
        )
        .setColor('#f1c40f')
    message.author.send(help)
    message.channel.send(
        `${message.author} Les commandes ont été envoyé en message privé !`
    )

    message.delete()
}

module.exports.help = {
    name: 'help',
}