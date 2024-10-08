const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownerinfo',
    description: 'Returns Information about Bot Owner',
    emoji: '<a:Owner:1142471386112209071>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const ownerId = '961930771344523264'; 
        try {
            const owner = await client.users.fetch(ownerId);
            const embed1 = new MessageEmbed()
                .setTitle('Owner Info')
                .setDescription('Here is some detailed information about the owner and the bot:')
                .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '<a:Owner:1142471386112209071> Owner', value: `<@${ownerId}>` },
                    { name: '<a:Owner:1142471386112209071> Owner Name', value: owner.username },
                    { name: '<a:Owner:1142471386112209071> Owner Discord Tag', value: owner.tag },
                    { name: '<a:Arrow:1259399777351897108> Bot Name', value: client.user.username },
                    { name: '<a:Arrow:1259399777351897108> Bot Discord Tag', value: client.user.tag },
                    { name: '<a:Arrow:1259399777351897108> Bot Description', value: 'A bot developed by the owner for various purposes.' },
                    { name: '<a:Arrow:1259399777351897108> Bot Development', value: 'Bot development, YouTube, Discord Bots' },
                    {
                        name: '<a:Arrow:1259399777351897108> Socials',
                        value: '[Bot Source Code](https://github.com/PHV08/Discord-BotV7) | [GitHub](https://github.com/PHV08) | [YouTube](https://www.youtube.com/@phveditz/videos)',
                    },
                    { name: '<a:Arrow:1259399777351897108> Discord', value: '[Join discord](https://discord.gg/KCJBVaFGj5)' }
                )
                .setColor(owner.hexAccentColor || '#800080');
            message.channel.send({ embeds: [embed1] });
        } catch (error) {
            console.error('Error fetching owner:', error);
            message.channel.send('An error occurred while fetching owner information.');
        }
    },
};
