const { Client, Collection, MessageEmbed } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const fs = require('fs');
const prefixSchema = require('./src/Models/Prefix');
require('dotenv').config();

const client = new Client({
    intents: 32767,
});
module.exports = client;

require("replit-uptimer").config({
    port: 3000,
    path: "/",
    message: "Subscribe to UNKNOWN PHV https://www.youtube.com/channel/UCGTbFucVXPA9OBTUPZj-TzQ. Please check out updates.md",
    debug: true,
});


client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./src/Commands');
client.discordTogether = new DiscordTogether(client);
client.config = process.env;
client.prefix = async (message) => {
    try {
        let custom;
        const data = await prefixSchema.findOne({ Guild: message.guild.id }).catch((err) => console.log(err));

        if (data) {
            custom = data.Prefix;
        } else {
            custom = process.env.PREFIX;
        }
        return custom;
    } catch (err) {
        console.error('Error in fetching prefix:', err);
        return process.env.PREFIX; 
    }
};


require('./src/Handler')(client);


require('./src/Utility/Levelling');


require('./src/Handler/Mongoose');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    
});

client.on('guildCreate', async (guild) => {
    console.log(`Bot added to guild: ${guild.name} (${guild.id})`);

    try {
        const owner = await client.users.fetch(guild.ownerId);

        if (owner) {
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setAuthor('Bot', client.user.displayAvatarURL())
                .setTitle('Thank You for Adding Me!')
                .setDescription(`Hello ${owner.username} and welcome to your server! 🎉\n\nThank you for inviting Me to your server. We're excited to help you manage your server and provide a fun experience for your members.`)
                .addField('How to Get Started', `You can use the prefix \`${await client.prefix({ guild })}\` to interact with the bot. Try out the following commands to get started:\n\n• Use \`${await client.prefix({ guild })}suggest\` to Suggest bot ideas with developers.\n• Use \`${await client.prefix({ guild })}help\` to see a list of available commands.`)
                .addField('Support and Feedback', 'If you have any questions, need assistance, or want to provide feedback, feel free to join our support server: [Bot Support Server](https://discord.gg/KCJBVaFGj5)')
                .setFooter('Thank you for choosing our Bot! Enjoy your time.');

            await owner.send({ embeds: [embed] });
            console.log(`Sent thank you message to ${owner.tag}`);
        }
    } catch (error) {
        console.error(`Failed to send thank you message to ${guild.ownerId}: ${error}`);

       
        const logChannel = client.channels.cache.get('1146041163304935474');
        if (logChannel) {
            const logEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Failed to Send Thank You Message')
                .setDescription(`Bot added to server: ${guild.name} (${guild.id})`)
                .addField('Owner', guild.ownerId)
                .addField('Error', `${error}`)
                .addField('Bot Still Added', 'The bot still got added to the server.')
                .addField('Server Invite', `You can join the server [here](${await guild.channels.cache.find(channel => channel.type === "GUILD_TEXT").createInvite().then(invite => invite.url)}).`);

                
            logChannel.send({ embeds: [logEmbed] });
        } else {
            console.error(`Log channel not found.`);
        }
    }
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const prefix = await client.prefix(message);

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        message.reply(`My prefix is \`${prefix}\``);
    }

    
    
    if (message.content.startsWith(`${prefix}ping`)) {
       
       
    }
});

client.login(process.env.TOKEN);
