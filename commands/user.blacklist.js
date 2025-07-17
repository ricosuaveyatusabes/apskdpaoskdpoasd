const fs = require('fs');

module.exports = {
    name: 'user.blacklist',
    description: 'Blacklists a user.',
    prefix: '#',
    ownerOnly: true,
    async execute(msg, args, blacklist_user) {
        if (args.length === 0) {
            await msg.channel.send({ content: `> Falta agregar un ID de usuario.` });
            return;
        };
        let usuario_id = args[0];
        blacklist_user.push(usuario_id);
        let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
        let ae = JSON.parse(blacklist_users_json);
        let xdxd = JSON.stringify(ae);
        let xd = xdxd.replace("]", "");
        let asd = `${xd}\n,{"id":"${usuario_id}"}]`;
        fs.writeFileSync('blacklist_users.json', asd);
    }
};
