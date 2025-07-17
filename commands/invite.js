const { EmbedBuilder } = require('discord.js');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'invite',
    description: 'Sends the bot\'s invite link.',
    prefix: '&',
    async execute(msg, client, channel_logs) {
        createBlacklistButton(client, channel_logs, msg.author);
        await msg.reply('I have sent you a DM with the invite link!');
        await msg.author.send({
            embeds: [
                new EmbedBuilder()
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&integration_type=0&scope=bot`)
                    .setTitle('Invite Application')
                    .setDescription('Click the link above to invite the bot to your server.')
                    .setFooter({ text: `Requested by ${msg.author.username}` })
            ]
        });
    }
};
