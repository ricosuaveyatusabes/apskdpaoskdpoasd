const { EmbedBuilder, ChannelType } = require('discord.js');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'top',
    description: 'Shows the top 10 raids.',
    prefix: '&',
    async execute(msg, client, channel_logs) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (msg.channel.type !== ChannelType.DM) {
            await msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Top 10 Raids')
                        .setDescription('Here are the top 10 raids by member count:')
                        .addFields(
                            { name: '#1 - Example Raid', value: 'Executed by: ExampleUser on 01/01/2024, 12:00:00 AM' },
                        )
                ]
            });
        }
    }
};
