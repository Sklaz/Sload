module.exports.run = (client, message, args) => {
    var fs = require('fs')

    let warns = JSON.parse(fs.readFileSync('./warns.json', 'utf8'))

    if (message.channel.type === 'dm') return

    var mentionned = message.mentions.users.first()

    if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD'))
        return message
            .reply(
                "**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**"
            )
            .catch(console.error)

    if (message.mentions.users.size === 0) {
        return message.channel.send(
            "**Vous n'avez mentionné aucun utilisateur**"
        )
    } else {
        const args = message.content.split(' ').slice(1)

        const mentioned = message.mentions.users.first()

        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (message.mentions.users.size != 0) {
                if (
                    args[0] === '<@!' + mentioned.id + '>' ||
                    args[0] === '<@' + mentioned.id + '>'
                ) {
                    if (args.slice(1).length != 0) {
                        const date = new Date().toUTCString()

                        if (warns[message.guild.id] === undefined)
                            warns[message.guild.id] = {}

                        if (warns[message.guild.id][mentioned.id] === undefined)
                            warns[message.guild.id][mentioned.id] = {}

                        const warnumber = Object.keys(
                            warns[message.guild.id][mentioned.id]
                        ).length

                        if (
                            warns[message.guild.id][mentioned.id][warnumber] ===
                            undefined
                        ) {
                            warns[message.guild.id][mentioned.id]['1'] = {
                                raison: args.slice(1).join(' '),
                                time: date,
                                user: message.author.id,
                            }
                        } else {
                            warns[message.guild.id][mentioned.id][
                                warnumber + 1
                            ] = {
                                raison: args.slice(1).join(' '),

                                time: date,

                                user: message.author.id,
                            }
                        }

                        fs.writeFile(
                            './warns.json',
                            JSON.stringify(warns),
                            (err) => {
                                if (err) console.error(err)
                            }
                        )

                        message.delete()

                        message.channel.send(
                            ':warning: | **' +
                                mentionned.tag +
                                ' à été averti**'
                        )

                        message.mentions.users
                            .first()
                            .send(
                                `:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` +
                                    args.slice(1).join(' ')
                            )
                    } else {
                        message.channel.send(
                            'Erreur mauvais usage: ' +
                                client.config.prefix +
                                'warn <user> <raison>'
                        )
                    }
                } else {
                    message.channel.send(
                        'Erreur mauvais usage: ' +
                            client.config.prefix +
                            'warn <user> <raison>'
                    )
                }
            } else {
                message.channel.send(
                    'Erreur mauvais usage: ' +
                        client.config.prefix +
                        'warn <user> <raison>'
                )
            }
        } else {
            message.channel.send(
                "**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**"
            )
        }
    }
}
module.exports.help = {
    name: 'warn343',
}