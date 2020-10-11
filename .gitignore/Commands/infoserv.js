const Discord = require('discord.js')

exports.run = (client, message, args) => {
    let botSize = message.guild.members.filter((b) => b.user.bot).size
    let userSize = message.guild.members.size
    let userSizenobot = userSize - botSize

    var infodiscord = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL)
        .addField(
            '📌 • __Propriétaire__ :',
            `${message.guild.owner.user}`,
            true
        )
        .addField('🌏 • __Région__ :', message.guild.region, true)
        .addField(
            '📋 • __Channels__ :',
            `**${message.guild.channels.size}** channels`,
            true
        )
        .addField(
            '👤 • __Utilisateurs :__ ',
            `**${userSizenobot}** utilisateurs`,
            true
        )
        .addField('🤖 • __Bots__ :', `**${botSize}** robots`, true)
        .addField('📄 • __ID__ :', message.guild.id, true)
        .addField(
            '🔒 • __Niveau vérification__ :',
            `Niveau **${message.guild.verificationLevel}**`,
            true
        )
        .addField(
            '📈 • __Nombre de rôles__ :',
            `**${message.guild.roles.size}** rôles`,
            true
        )
        .addField(
            "🔧 • __Nombre d'émojis :__",
            `**${message.guild.emojis.size}** émojis`,
            true
        )
        .addField(
            '📅 • __Date de création__ :',
            `${new Date(message.channel.guild.createdAt)
                .toISOString()
                .replace('T', ' à ')
                .replace('Z', '')}`,
            true
        )
        .setColor('#8697CB')
    message.channel.send(infodiscord)
}

module.exports.help = {
    name: 'infoserv',
}
