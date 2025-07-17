const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const { addUserToBlacklist } = require('./json-handler');

async function createBlacklistButton(client, channel_logs, author) {
    try {
        const blacklist_pecausa = new ButtonBuilder()
            .setCustomId('xdxd')
            .setLabel('Blacklist User')
            .setStyle(ButtonStyle.Danger);
        const equisde = new ActionRowBuilder()
            .addComponents(blacklist_pecausa);
        const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command executed by **${author.username}** (${author.id})` });
        const colector = msgxd.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 30_000
        });
        colector.on(`collect`, (int) => {
            if (int.customId === "xdxd") {
                addUserToBlacklist(author.id);
                int.reply({ content: `> Usuario en blacklist.` });
                return;
            };
        });
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = { createBlacklistButton };
