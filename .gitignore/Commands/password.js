const Discord = require('discord.js')
const generator = require('generate-password')
const axios = require('axios').default
const now = new Date()
const hour = now.getHours()
const minute = now.getMinutes()
const second = now.getSeconds()

exports.run = (client, message, args) => {
    message.reply('Combien de caractères souhaitez-vous ?')

    var chars = 'nd'
    var numbers = 'nd'
    var symbols = 'nd'

    const collector = new Discord.MessageCollector(
        message.channel,
        (m) => m.author.id === message.author.id,
        { time: 300000 }
    )

    collector.on('collect', (message) => {
        if (chars === 'nd' && numbers === 'nd' && symbols === 'nd') {
            if (isNaN(message.content))
                return message.reply('veuillez entrer un nombre valide.')
            if (parseInt(message.content) > 100000)
                return message.reply('Min : 0 | Max : 100000')
            chars = message.content
            return message.reply(
                'Le mot de passe peut-il contenir des numbers ? oui/non'
            )
        }

        if (chars !== 'nd' && numbers === 'nd' && symbols === 'nd') {
            var response = message.content.toLowerCase()
            if (response !== 'oui' && response !== 'non')
                return message.reply('répondez par `oui` ou par `non` !')
            if (response === 'oui') numbers = true
            if (response === 'non') numbers = false
            return message.reply(
                'Le mot de passe peut-il contenir des symbols ? oui/non'
            )
        }
        if (chars !== 'nd' && numbers !== 'nd' && symbols === 'nd') {
            var response = message.content.toLowerCase()
            if (response !== 'oui' && response !== 'non')
                return message.reply('répondez par `oui` ou `non` !')
            if (response === 'oui') symbols = true
            if (response === 'non') symbols = false
            return collector.stop('ok')
        }
    })

    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            return message.reply('Temps écoulé.').then((d) => d.delete(5000))
        }
        if (reason === 'ok') {
            var password = generator.generate({
                length: chars,
                numbers: numbers,
                symbols: symbols,
            })
            if (password.length > 1970) {
                axios
                    .post(`https://hastebin.com/documents`, password)
                    .then((response) => {
                        message.author.send(
                            `\`\`\`Le mot de passe compte trop de caractères, il se trouve donc sur hastebin. Le lien : https://hastebin.com/${response.data.key}\`\`\``
                        )
                        return message.channel.send(
                            '✔️ Mot de passe envoyé en message privé !'
                        )
                    })
            } else {
                message.author.send(
                    `\`\`\`Mot de passe généré : ${password}\`\`\``
                )
                return message.channel.send(
                    '✔️ Mot de passe envoyé en message privé !'
                )
            }
        }
        if (reason !== 'time' && reason !== 'ok') {
            return message.reply('erreur.').then((d) => d.delete(5000))
        }
    })
}

module.exports.help = {
    name: 'password',
}
