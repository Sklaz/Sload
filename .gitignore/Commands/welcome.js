exports.run = (client, message, args) => {
    const member = message.mentions.members.first()
    if (!member)
        return message.channel.send(
            '❗ Merci de mentionner un utilisateur pour souhaiter la bienvenue.'
        )
    message.channel.send(
        `${message.author} vous souhaite bienvenue **${member.user}** !`
    )
    message.delete()
}

module.exports.help = {
    name: 'welcome',
}
