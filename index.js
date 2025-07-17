const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const commandHandler = require('./command-handler');
const { readJSON, addUserToBlacklist, addPremiumUser, readPremiumConfigs, writePremiumConfigs } = require('./utils/json-handler');
const { createBlacklistButton } = require('./utils/blacklist-button');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

if (!fs.existsSync('config_premium_users.json')) {
    fs.writeFileSync('config_premium_users.json', '{}');
};
if (!fs.existsSync('ids_premium_users.json')) {
    fs.writeFileSync('ids_premium_users.json', '[]');
};
if (!fs.existsSync('blacklist_users.json')) {
    fs.writeFileSync('blacklist_users.json', '[]');
};

let config_usuarios_premium = readPremiumConfigs();
let usuarios_premium = readJSON('ids_premium_users.json').map(user => user.id);
let blacklist_user = readJSON('blacklist_users.json').map(user => user.id);

commandHandler(client);

client.on('ready', () => {
    console.clear();
    console.log('');
    console.log(`> Bot ${client.user.username} activo.`);
    console.log(`> Invitación del Bot (administrador permisos): https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&integration_type=0&scope=bot`);
    console.log('');
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot || blacklist_user.includes(msg.author.id)) {
        return;
    }

    const prefix = msg.content.startsWith(config.prefix) ? config.prefix : (msg.content.startsWith(config.prefix_p) ? config.prefix_p : null);
    if (!prefix) {
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) {
        return;
    }

    if (command.prefix !== prefix) {
        return;
    }

    if (command.ownerOnly && !config.usuarios_owners.includes(msg.author.id)) {
        return;
    }

    if (command.premium && !usuarios_premium.includes(msg.author.id)) {
        return;
    }

    try {
        createBlacklistButton(client, config.channel_logs, msg.author);
        await command.execute(msg, args, client, config.channel_logs, blacklist_user, config.idservidores_nopermitidos, config.bot_token, usuarios_premium, config_usuarios_premium);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});

client.login(config.bot_token);
