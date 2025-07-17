const { readPremiumConfigs, writePremiumConfigs } = require('../utils/json-handler');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'use.token',
    description: 'Sets the bot token for a premium user.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (args.length === 0) {
            return msg.channel.send({ content: '> You need to provide a bot token.' });
        }
        const token = args[0];
        const premiumConfigs = readPremiumConfigs();

        if (!premiumConfigs[msg.author.id]) {
            premiumConfigs[msg.author.id] = {};
        }

        premiumConfigs[msg.author.id].bot_token_n = token;
        writePremiumConfigs(premiumConfigs);

        await msg.channel.send({ content: '> The bot token has been set.' });
    }
};
