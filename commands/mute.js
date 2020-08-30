const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

  //!tempmute @user 1s/m/h/d


  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Sorry je kunt dit niet doen!");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server!");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt deze gebruiker niet muten!");

    var muteRole = message.guild.roles.cache.get('555469695998754816');

    if (!muteRole) return message.channel.send("De rol muted bestaat niet!");

    var muteTime = args[1];
    
    if (!muteTime) return message.channel.send("Geef een tijd mee.")

    await (mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} is gemuted voor ${muteTime}`);

    let muteChannel = message.guild.channels.cache.get('555060401272913923');

    if (!muteChannel) return message.channel.send("Kan de kanaal niet vinden.");


    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

        message.channel.send(`${mutePerson} is geunmuted`);

    }, ms(muteTime));

    
    let unmuteChannel = message.guild.channels.cache.get('555060401272913923');

    if (!unmuteChannel) return message.channel.send("Kan de kanaal niet vinden.");

}


module.exports.help = {
  name: "mute"
}