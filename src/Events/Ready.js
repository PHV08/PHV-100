require('dotenv').config();
const client = require('../../index');
const chalk = require('chalk');
const prefix = process.env.PREFIX;
const ownerID = '961930771344523264'; 
const ownerEmoji = '<a:Owner:1142471386112209071>'; 

const statuses = [
  { name: `${prefix}help`, type: 'STREAMING', url: 'https://twitch.tv/#' },
  { name: '100 Commands', type: 'STREAMING', url: 'https://twitch.tv/#' },
  { name: `${prefix}serverstats`, type: 'STREAMING', url: 'https://twitch.tv/#' },
  
];

let statusIndex = 0;

client.on('ready', async () => {
  setStatus();

  console.log(
    `${chalk.grey.bold('[INFO]  ')}${chalk.blueBright.bold(client.user.tag)} ${chalk.white('is')} ${chalk.green.bold(
      'Online'
    )}`
  );

  
  setInterval(() => {
    statusIndex = (statusIndex + 1) % statuses.length;
    setStatus();
  }, 10000); 
});

client.on('message', (message) => {
  if (message.author.id === ownerID) {
    message.react(ownerEmoji)
      .catch((error) => {
        console.error(`Failed to react to message: ${error}`);
      });
  }
});

function setStatus() {
  const { name, type, url } = statuses[statusIndex];
  client.user.setActivity(name, { type, url });
}
