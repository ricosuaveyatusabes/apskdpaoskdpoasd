const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'spamchannels',
    description: 'Spams all channels with a message.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (idservidores_nopermitidos.includes(msg.guild.id)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        const sendMessages = async (channel) => {
            const channelToSend = client.channels.cache.get(channel.id);
            for (let i = 0; i < 25; i++) {
                try {
                    await channelToSend.send({ content: '@everyone https://discord.gg/kEB3PCPkzc - | - https://www.youtube.com/watch?v=rY1JyWyQiSI / #HailZenX' });
                } catch (e) {
                    console.log(`[X] Could not send a message with the "spamchannels" command, error message: ${e.message}`);
                }
            }
        };

        const channels = await msg.guild.channels.fetch();
        for (const channel of channels.values()) {
            await sendMessages(channel);
        }
    }
};
