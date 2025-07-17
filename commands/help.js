const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const { createBlacklistButton } = require('../utils/blacklist-button');

module.exports = {
    name: 'help',
    description: 'Displays the help menu.',
    prefix: '&',
    async execute(msg, client, channel_logs, blacklist_user) {
        createBlacklistButton(client, channel_logs, msg.author);
        await msg.react('👍');
        await msg.author.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('<:dolce_167:1395329873286795295> Application Commands <:dolce_167:1395329873286795295>')
                    .setDescription(`
**Normal Commands**
> \`&on\` - Start a raid in the server.
> \`&banall\` - Ban all users in the server.
> \`&channels\` - Delete all channels in the server.
> \`&spamchannels\` - Spam all channels with a message.
> \`&spamroles\` - Spam roles in the server.
> \`&spamusers\` - Rename all users.
> \`&top\` - View the top raids.

**Premium Commands**
> \`#invite.guild\` - Set the invite link for a premium user.
> \`#use.token\` - Set the bot token for a premium user.
> \`#use.guild\` - Set the guild to nuke for a premium user.
> \`#nuke.guild\` - Nuke a guild.
> \`#admin.guild\` - Get admin in a guild.
> \`#find.guilds\` - Find guilds with admin permissions.

**What is Premium?**
> It allows you to customize the bot with your settings.

**How to get Premium?**
> Get premium by purchasing it for $1.99 (lifetime) [here](https://discord.gg/kEB3PCPkzc).
                    `)
                    .setColor('#d20f15')
            ]
        });
    }
};
