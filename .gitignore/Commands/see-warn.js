const Discord = require('discord.js')
const prefix = 's!'

module.exports.run = (client, message, args) => {
    var fs = require('fs')

    let warns = JSON.parse(fs.readFileSync('./warns.json', 'utf8'))

    if (message.channel.type === 'dm') return

    if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD'))
        return message
            .reply(
                "**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**"
            )
            .catch(console.error)

    const mentioned = message.mentions.users.first()

    if (message.member.hasPermission('MANAGE_GUILD')) {
        if (message.mentions.users.size !== 0) {
            if (
                args[0] === '<@!' + mentioned.id + '>' ||
                args[0] === '<@' + mentioned.id + '>'
            ) {
                try {
                    if (
                        warns[message.guild.id][mentioned.id] === undefined ||
                        Object.keys(warns[message.guild.id][mentioned.id])
                            .length === 0
                    ) {
                        message.channel.send(
                            '**' + mentioned.tag + "** n'a aucun warn :eyes:"
                        )

                        return
                    }
                } catch (err) {
                    message.channel.send(
                        '**' + mentioned.tag + "** n'a aucun warn :eyes:"
                    )

                    return
                }

                let arr = []

                arr.push(
                    `**${mentioned.tag}** a **` +
                        Object.keys(warns[message.guild.id][mentioned.id])
                            .length +
                        '** warns :eyes:'
                )

                for (var warn in warns[message.guild.id][mentioned.id]) {
                    arr.push(
                        `**${warn}** - **"` +
                            warns[message.guild.id][mentioned.id][warn].raison +
                            '**" warn donné par **' +
                            message.guild.members.find(
                                'id',
                                warns[message.guild.id][mentioned.id][warn].user
                            ).user.tag +
                            '** a/le **' +
                            warns[message.guild.id][mentioned.id][warn].time +
                            '**'
                    )
                }

                message.channel.send(arr.join('\n'))
            } else {
                message.channel.send(
                    'Erreur mauvais usage: ' +
                        prefix +
                        'seewarn <user> <raison>'
                )

                console.log(args)
            }
        } else {
            message.channel.send(
                'Erreur mauvais usage: ' + prefix + 'seewarn <user> <raison>'
            )
        }
    } else {
        message.channel.send(
            "**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**"
        )
    }
}
module.exports.help = {
    name: 'seewarn434',
}