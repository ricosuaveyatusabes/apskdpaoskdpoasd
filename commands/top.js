const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, ChannelType } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'top',
    description: 'Shows the top 10 raids.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **top** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
        }
        if (msg.channel.type !== ChannelType.DM) {
            await msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Top 10 Raids`)
                        .setDescription(`Here are the top 10 raids by member count:`)
                        .addFields(
                            { name: "#9999999 -asdjaosjdoijas", value: "Executed by: hola amma on 6/22/9999, 11:53:10 PM" },
                        )
                ]
            });
        }
    }
};
