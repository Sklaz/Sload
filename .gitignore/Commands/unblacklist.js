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
    } else if (args.length > 1) {
        return message.channel.send("Il ne faut tag qu'une seule personne !")
    } else if (args.length < 1) {
        return message.channel.send('Il faut tag au moins une personne !')
    }
    const target = args.shift()
    await knex('blacklist').delete().where({
        member_id: target,
    })
    client.guilds.forEach((guild) => {
        guild.fetchBans().then(async (users) => {
            const user = users.filter((user) => user.id == target).first()
            if (user) {
                await guild.unban(user)
            }
        })
    })
    message.channel.send('Le membre a bien été unblacklist.')
}

module.exports.help = {
    name: 'unblacklist',
}
