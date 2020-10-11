const Discord = require("discord.js")
module.exports = (client, member) => {
    let leaveEmbed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setDescription(
            `Sniff... ${member} Vient de quitter le serveur SLOAD :cry: !`
        )
        .setFooter('SLOAD | BY SKLAZ')
    var channel = member.guild.channels.get('622834176894435329')
    if (!channel) return
    channel.sendEmbed(leaveEmbed)
}