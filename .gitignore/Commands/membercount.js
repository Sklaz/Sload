const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const online =
        message.guild.members.filter((m) => m.presence.status != 'offline')
            .size - message.guild.members.filter((m) => m.user.bot).size
    const embed = new Discord.RichEmbed()
        .setAuthor(
            'Nom du serveur: ' + message.guild.name,
            message.guild.iconURL
        )
        .setColor(0x00a2e8)
        .addField(
            'Membres',
            `${
                message.guild.memberCount -
                message.guild.members.filter((m) => m.user.bot).size
            }`,
            true
        )
        .addField('En Ligne', `${online}`, true)
        .addField('Bots', message.guild.members.filter((m) => m.user.bot).size)
        .setTimestamp()
        .setFooter('SLOAD | BY SKLAZ')
    message.channel.send({ embed })
}

module.exports.help = {
    name: 'membercount',
}
