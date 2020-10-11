const Discord = require('discord.js')
const axios = require('axios').default

exports.run = (client, message, args) => {
    const result = Math.floor(Math.random() * 115)
    const url = `https://bridge.buddyweb.fr/api/blagues/blagues/${result}`
    axios.get(url).then((response) => {
        message.channel.send(`\`\`\`${response.data.blagues}\`\`\``)
    })
}

module.exports.help = {
    name: 'blague',
}
