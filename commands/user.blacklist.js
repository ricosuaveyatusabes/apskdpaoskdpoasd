const { addUserToBlacklist } = require('../utils/json-handler');

module.exports = {
    name: 'user.blacklist',
    description: 'Blacklists a user.',
    prefix: '#',
    ownerOnly: true,
    async execute(msg, args) {
        if (args.length === 0) {
            return msg.channel.send({ content: '> You need to provide a user ID.' });
        }
        const userId = args[0];
        addUserToBlacklist(userId);
        await msg.channel.send({ content: `> User with ID ${userId} has been blacklisted.` });
    }
};
