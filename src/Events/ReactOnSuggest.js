const client = require('../../index');

const channel = '1146041177381023826';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        if (message.author.bot) {
            message.react('<:yes:1249307140682940487>');
            message.react('<:no:1249307494656901133>');
            message.react('<a:shrug1:1142762523687403550>');
        }
        if (!message.author.bot) return;
    }
});
