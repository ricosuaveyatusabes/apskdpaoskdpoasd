const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'find.guilds',
    description: 'Finds guilds with admin permissions.',
    prefix: '#',
    premium: true,
    async execute(msg, client, channel_logs, blacklist_user, config_usuarios_premium) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **find.guilds** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
        if (!config_usuarios_premium[msg.author.id].guild_id) {
            await msg.channel.send({ content: `> No haz introducido ninguna ID de un servidor por lo tanto no se puede nukear.` });
            return;
        } else {
            if (!config_usuarios_premium[msg.author.id].bot_token_n) {
                await msg.channel.send({ content: `> No haz introducido ningún token de bot.` });
                return;
            } else {
                await msg.channel.send({ content: `> Buscando servidores con permisos de administardor en el token xdxd...` });
                let namev = `client${msg.author.id}`;
                namev = new Client({ intents: [103423] });
                await namev.login(config_usuarios_premium[msg.author.id].bot_token_n);
                const ajskdsa = await namev.guilds.fetch();
                for (const xdsdagjfvsarjhjfsthb of ajskdsa.values()) {
                    try {
                        if (namev.guilds.cache.get(`${xdsdagjfvsarjhjfsthb.id}`).members.cache.get(`${namev.user.id}`).permissions.has(PermissionsBitField.Flags.Administrator)) {
                            await msg.channel.send({ content: `> El bot tiene permisos de administrador en el servidor ${xdsdagjfvsarjhjfsthb.name}` })
                        };
                    } catch (e) {
                        console.log(e)
                        await msg.channel.send({ content: `> No se pudo obtener información del servidor ${xdsdagjfvsarjhjfsthb.id}` })
                    }
                };
                await namev.destroy();
            };
        };
    }
};
