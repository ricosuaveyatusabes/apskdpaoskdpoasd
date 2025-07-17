const { readPremiumConfigs, writePremiumConfigs } = require('../utils/json-handler');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'invite.guild',
    description: 'Sets the invite link for a premium user.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (args.length === 0) {
            return msg.channel.send({ content: '> You need to provide an invite link.' });
        }
        const inviteURL = args[0];
        const premiumConfigs = readPremiumConfigs();

        if (!premiumConfigs[msg.author.id]) {
            premiumConfigs[msg.author.id] = {};
        }

        premiumConfigs[msg.author.id].invite_url = inviteURL;
        writePremiumConfigs(premiumConfigs);

        await msg.channel.send({ content: `> The invite link has been set to: ${inviteURL}` });
    }
};
