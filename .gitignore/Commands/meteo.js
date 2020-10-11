const Discord = module.require('discord.js')
const weather = require('weather-js')

module.exports.run = async (client, message, args) => {
    weather.find({ search: args.join(' '), degreeType: 'C' }, (err, result) => {
        if (err) console.error(err)

        if (!result) {
            return message.channel.send(
                '**Veuillez entrer une localisation qui existe**'
            )
        }

        var current = result[0].current
        var location = result[0].location

        let embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Météo pour ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00ae86)
            .addField('Fuseau horaire', `UTC${location.timezone}`, true)
            .addField('Type de degré', location.degreetype, true)
            .addField('Temperature', `${current.temperature}`, true)
            .addField('Vents', current.winddisplay, true)
            .addField('Humidité', ` ${current.humidity}%`, true)
            .addField('Jour', `${current.day} ${current.date}`, true)

        message.channel.send(embed)
    })

    message.delete()
}
module.exports.help = {
    name: 'meteo',
}
