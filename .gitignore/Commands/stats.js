const Discord = require('discord.js')

module.exports.run = (
    client = new Discord.Client(),
    message = new Discord.Message(),
    args = []
) => {
    const member = message.mentions.members.first() || message.member
    const statsEmbed = new Discord.RichEmbed()
        .setColor(0xb1e436)
        .setTitle(`Stats de l'utilisateur **${member.user.username}**`)
        .setThumbnail(member.user.displayAvatarURL)
        .addField('ID :', member.id)
        .addField(
            'Rejoint le :',
            new Date(member.joinedAt)
                .toISOString()
                .replace('T', ' à ')
                .replace('Z', '')
        )
        .addField(
            'Enregistré le :',
            new Date(member.user.createdAt)
                .toISOString()
                .replace('T', ' à ')
                .replace('Z', '')
        )
        .addField(
            'Jeu :',
            member.user.presence.game
                ? member.user.presence.game.name
                : 'Aucun jeu'
        )
        .setFooter(`Informations de l'utilisateur ${member.user.username}`)
    message.channel.send(statsEmbed)
}

module.exports.help = {
    name: 'stats',
}
