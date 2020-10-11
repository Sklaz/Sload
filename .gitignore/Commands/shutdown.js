const Discord = require('discord.js')
const ops = require('../ops.json')
exports.run = (client, message = new Discord.Message(), args) => {
    if (!ops.includes(message.author.id))
        return message.reply(
            "Vous n'êtes pas autorisé à utiliser cette commande !"
        )

    message.channel.send(
        "Êtes-vous sûr de vouloir m'arrêter ?\n\nEcrire `cancel` pour ** cancel ** l'arrêt. Anulation du shutdown dans **30 secondes**. Sinon ecrire ** yes ** pour effectuer le shutdown."
    )
    const filter = (m) => m.author.id === message.author.id
    message.channel
        .awaitMessages(filter, {
            errors: ['time'],
            max: 2,
            time: 30000,
        })
        .then((answerCollection) => {
            if (!answerCollection) return
            const answer = answerCollection.array()[0]
            if (['cancel', 'no', 'n'].includes(answer.content.toLowerCase())) {
                return message.channel.send('**Arrêt interrompu.**')
            } else if (['yes', 'y'].includes(answer.content.toLowerCase())) {
                message.channel.send('Au revoir :wave:').finally((_) => {
                    client
                        .destroy()
                        .then(() => {
                            process.exit()
                        })
                        .catch((_) => 0)
                })
            } else {
                message.channel.send('Réponse invalide.').catch((_) => 0)
            }
        })
        .catch(() => {
            console.error
            message.channel.send('Temps expiré')
        })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
}

exports.help = {
    name: 'shutdown',
    description: 'Shutdown the bot.',
    usage: 'shutdown',
}
