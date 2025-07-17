const { Client, PermissionsBitField } = require('discord.js');
const { readPremiumConfigs } = require('../utils/json-handler');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'find.guilds',
    description: 'Finds guilds with admin permissions.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs) {
        createBlacklistButton(client, channel_logs, msg.author);
        const premiumConfigs = readPremiumConfigs();
        const userConfig = premiumConfigs[msg.author.id];

        if (!userConfig || !userConfig.bot_token_n) {
            return msg.channel.send({ content: '> You have not set a bot token to use.' });
        }

        await msg.channel.send({ content: '> Searching for guilds with admin permissions...' });

        const findClient = new Client({ intents: [103423] });
        await findClient.login(userConfig.bot_token_n);

        try {
            const guilds = await findClient.guilds.fetch();
            for (const guild of guilds.values()) {
                try {
                    const fetchedGuild = await findClient.guilds.fetch(guild.id);
                    const member = await fetchedGuild.members.fetch(findClient.user.id);
                    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                        await msg.channel.send({ content: `> The bot has admin permissions in the server: ${fetchedGuild.name}` });
                    }
                } catch (e) {
                    console.log(e);
                    await msg.channel.send({ content: `> Could not get information for the server: ${guild.id}` });
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            await findClient.destroy();
        }
    }
};
