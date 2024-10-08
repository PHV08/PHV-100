const { Client, Message, MessageMentions } = require('discord.js');
const axios = require('axios'); 

module.exports = {
    name: 'compliment',
    description: 'Send a random compliment to a user!',
    emoji: '<a:compliment:1142709434003497040>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      
        const targetUser = message.mentions.users.first() || message.author;

        try {
          
            const response = await axios.get('https://complimentr.com/api');
            const randomCompliment = response.data.compliment;

            message.channel.send(`Hey ${targetUser}, ${randomCompliment}`);
        } catch (error) {
            console.error('Error fetching compliments:', error);
            message.channel.send('An error occurred while fetching compliments.');
        }
    },
};
