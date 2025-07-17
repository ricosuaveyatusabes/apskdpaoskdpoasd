const { readPremiumConfigs, writePremiumConfigs } = require('../utils/json-handler');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'use.guild',
    description: 'Sets the guild to nuke for a premium user.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (args.length === 0) {
            return msg.channel.send({ content: '> You need to provide a guild ID.' });
        }
        const guildId = args[0];

        if (idservidores_nopermitidos.includes(guildId)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        const premiumConfigs = readPremiumConfigs();

        if (!premiumConfigs[msg.author.id]) {
            premiumConfigs[msg.author.id] = {};
        }

        premiumConfigs[msg.author.id].guild_id = guildId;
        writePremiumConfigs(premiumConfigs);

        await msg.channel.send({ content: `> The guild ID has been set to: ${guildId}` });
    }
};
