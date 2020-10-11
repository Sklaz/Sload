const Discord = require('discord.js')

module.exports = (
    client = new Discord.Client(),
    message = new Discord.Message()
) => {
    if (
        message.author.bot ||
        message.channel.type === 'dm' ||
        !message.content.startsWith(client.config.prefix) ||
        !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')
    ) {
        return
    }

    const ops = require('../ops.json')
    let args = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g)
    let commande = args.shift()
    let cmd = client.commands.get(commande)
    if (!cmd) {
        return
    }
    cmd.run(client, message, args)
}