const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");
const ms = require("ms");

const client = new discord.Client();
client.commands = new discord.Collection();
client.login(process.env.token);

fs.readdir("./commands/", (err, files) =>{
  if(err) console.err(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <=0){
    console.log("No commands to load!");
    return;
  }

  console.log(`loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
  });
});


client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("OfficialMarvin", { type: "PLAYING" });

});
client.on('guildMemberAdd', member => {

    var role = member.guild.roles.cache.get('534308124270657547');

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('528638220104237066');

    if (!channel) return;

    channel.send('**' + member.user.username + '**, Welkom op **OfficialMarvin** discord :tada::hugging:!');


});

client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('528638220104237066');

    if (!channel) return;

    channel.send('**' + member.user.username + '**, heeft **OfficialMarvin** discord verlaten :pensive::cry:!');


});


client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, args);

    if (command === `${prefix}hallo`) {

        return message.channel.send("Hallo!!");

    }
});


