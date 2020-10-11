const dbConfig = require('../config.json').db
const knex = require('knex')(dbConfig)
const Discord = require('discord.js')
module.exports = (client, member = new Discord.GuildMember()) => {
    knex('blacklist')
        .select('*')
        .where({ member_id: member.id })
        .then(async (blacklisted) => {
            if (blacklisted.length > 0) {
                return member.user
                    .send(
                        'Tu as été blacklisté par **Sload** tu ne peux plus rejoindre un serveur ou je suis present. Tu penses que c\'est une erreur ? Contacte-nous grace à l\'adresse "blacklist@sloadbot.fr"'
                    )
                    .then(() =>
                        member.ban().catch((_) => {
                            0
                        })
                    )
                    .catch((_) => 0)
            } else {
                const welcomeEmbed = new Discord.RichEmbed()
                    .setAuthor(
                        member.user.username,
                        member.user.avatarURL,
                        member.user.avatarURL
                    )
                    .setDescription(
                        `Bienvenue sur le serveur de SLOAD ${member} :wink:, Pour avoir accès au serveur il te suffit d'aller dans # :white_check_mark: vérification :white_check_mark: et cliquer sur la réaction :white_check_mark: !`
                    )
                    .setFooter(
                        `${client.user.username.toUpperCase()} | BY SKLAZ`
                    )
                    .setColor(0x00ff00)

                member.guild.channels
                    .get('622834176894435329')
                    .send(welcomeEmbed)
                    .catch((_) => {
                        0
                    })
            }
        })
}