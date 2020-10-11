const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (args[0] == 'help') {
        let helpembxd = new Discord.RichEmbed()
            .setColor('#fffe00')
            .addField('Contact Command', 'Usage: !Contact <reason>')

        message.channel.send(helpembxd)
        return
    }

    let Invite = await message.guild.channels
        .find((c) => c.type === 'text')
        .createInvite()
    let Sender = message.author
    const sayMessage = args.join(' ')
    if (!sayMessage)
        return message.channel
            .send(
                "S'il vous plaît veuillez nous donner la raison pour nous contacter"
            )
            .then((msg) => {
                msg.delete(5000)
            })

    let contact = new Discord.RichEmbed()
        .setColor('fffe00')
        .setThumbnail(Sender.displayAvatarURL)
        .setDescription(
            `Message de contact du serveur [${message.guild.name}](${Invite.url})`
        )
        .setTitle('Message de la commande contact !')
        .addField('Utilisateur', Sender, true)
        .addField('Utilisateur ID: ', Sender.id, true)
        .addField('Message: ', sayMessage)
        .setTimestamp()

    bot.users.get('490458230854778910').send(contact)

    let embed = new Discord.RichEmbed()
        .setColor('#fffe00')
        .setTitle('Message envoyé !')
        .setDescription('Votre message de contact a été envoyé !')
        .addField('Demandé par ', Sender)
        .addField('Message: ', sayMessage)
        .setFooter("Merci d'avoir contacté le support SLOAD !")

    message.channel.send(embed).then((msg) => {
        msg.delete(10000)
    })

    message.delete()
}
module.exports.help = {
    name: 'contact',
}
