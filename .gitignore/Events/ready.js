const dbConfig = require('../config.json').db
const knex = require('knex')(dbConfig)

knex.schema.hasTable('blacklist').then(async (exists) => {
    if (!exists) {
        await knex.schema.createTable('blacklist', (table) => {
            table.increments()
            table.text('member_id')
            table.text('blacklisted_by')
            table.text('reason')
        })
    }
})

const changeP = async function (client) {
    if (client.now == 0) {
        client.user.setPresence({
            game: {
                name: "s!help --> Affiche l'aide !",
            },
        })
        client.now = 1
    } else if (client.now == 1) {
        client.user.setPresence({
            game: {
                name: `sur ${client.guilds.size} serveurs !`,
            },
        })
        client.now = 2
    } else if (client.now == 2) {
        client.user.setPresence({
            game: {
                name: 'sloadbot.fr',
            },
        })
        client.now = 0
    }
}

module.exports = (client) => {
    client.now = 0
    setInterval(changeP, 10000, client)
}
