const { addPremiumUser, readPremiumConfigs, writePremiumConfigs } = require('../utils/json-handler');

module.exports = {
    name: 'user.add',
    description: 'Adds a premium user.',
    prefix: '#',
    ownerOnly: true,
    async execute(msg, args) {
        if (args.length === 0) {
            return msg.channel.send({ content: '> You need to provide a user ID.' });
        }
        const userId = args[0];
        addPremiumUser(userId);

        const premiumConfigs = readPremiumConfigs();
        premiumConfigs[userId] = {};
        writePremiumConfigs(premiumConfigs);

        await msg.channel.send({ content: `> User with ID ${userId} has been added to the premium users.` });
    }
};
