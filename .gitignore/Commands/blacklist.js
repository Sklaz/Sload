const Discord = require('discord.js')
const dbConfig = require('../config.json').db
const knex = require('knex')(dbConfig)
const ops = require('../ops.json')

module.exports.run = async (
    client = new Discord.Client(),
    message = new Discord.Message(),
    args = []
) => {
    if (!ops.includes(message.member.id)) {
        return message.channel.send('Tu dois être op pour faire ça !')
    } else if (message.mentions.members.size > 1) {
        return message.channel.send("Il ne faut tag qu'une seule personne !")
    } else if (message.mentions.members.size < 1) {
        return message.channel.send('Il faut tag au moins une personne !')
    }
    const target = message.mentions.members.first()
    if (target == message.member) {
        return message.channel.send('Tu ne peux pas te blacklist toi même.')
    }
    args.shift()

    if (target.bannable) {
        const reason = args.join(' ')
        await knex('blacklist').insert({
            member_id: target.id,
            blacklisted_by: message.member.id,
            reason: reason || 'Pas de raison spécifiée.',
        })

        target
            .send(
                'Tu as été blacklisté par **Sload** tu ne peux plus rejoindre un serveur ou je suis present. Tu penses que c\'est une erreur ? Contacte-nous grace à l\'adresse "blacklist@sloadbot.fr"'
            )
            .catch((_) => 0)
        setTimeout(() => {
            target
                .ban()
                .then((_) => {
                    client.guilds.forEach((guild) => {
                        const member = guild.members
                            .filter((member) => member.id == target.id)
                            .first()
                        if (member)
                            member.ban().catch((_) => {
                                0
                            })
                    })
                    message.channel.send(
                        `L'id ${args[0]} est désormais blacklist.`
                    )
                })
                .catch((_) => {
                    message.reply(
                        "Je n'ai pas les permissions suffisantes pour bannir le membre."
                    )
                })
        }, 2000)
    } else message.channel.send('Je ne peux pas blacklister ce membre.')
}

module.exports.help = {
    name: 'blacklist',
}