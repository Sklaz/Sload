module.exports.run = async (bot, message, args) => {
    if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD'))
        return message
            .reply(
                "**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**"
            )
            .catch(console.error)

    message.delete()

    if (!args.join(' ')) {
        return message.channel.send(':x: ' + '| Enter un message !')
    }
    message.channel.send(args.join(' '))
}

module.exports.help = {
    name: 'say',
}
