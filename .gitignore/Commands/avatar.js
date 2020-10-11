module.exports.run = async (bot, message, args) => {
    message.channel.send('Generating avatar...').then((msg) => {
        const target = message.mentions.members.first() || message.member
        message.channel.send(
            target.user.avatarURL || target.user.defaultAvatarURL
        )
        msg.delete()
    })
}

module.exports.help = {
    name: 'avatar',
}
