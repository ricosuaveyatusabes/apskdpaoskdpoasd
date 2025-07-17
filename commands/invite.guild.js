const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'invite.guild',
    description: 'Sets the invite link for a premium user.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs, blacklist_user, config_usuarios_premium) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **invite.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
        if (args.length === 0) {
            await msg.channel.send({ content: `> Falta agregar el enlace de invitación.` });
            return;
        };
        if (!config_usuarios_premium[msg.author.id]) {
            config_usuarios_premium[msg.author.id] = {
                invite_url: args[0]
            };
            await msg.channel.send({ content: `> Se agregó una invitación.` });
        } else {
            config_usuarios_premium[msg.author.id].invite_url = args[0];
            await msg.channel.send({ content: `> Se editó la invitación.` });
        };
        console.log(config_usuarios_premium);
    }
};
