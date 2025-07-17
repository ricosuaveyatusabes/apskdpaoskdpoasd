const fs = require('fs');

module.exports = {
    name: 'user.add',
    description: 'Adds a premium user.',
    prefix: '#',
    ownerOnly: true,
    async execute(msg, args, usuarios_premium, config_usuarios_premium) {
        if (args.length === 0) {
            await msg.channel.send({ content: `> Falta agregar un ID de usuario.` });
            return;
        };
        let usuario_id = args[0];
        usuarios_premium.push(usuario_id);
        config_usuarios_premium[usuario_id] = "";
        console.log(config_usuarios_premium)
        let usuarios_premium_jsonxd = fs.readFileSync("ids_premium_users.json", 'utf-8');
        let ae = JSON.parse(usuarios_premium_jsonxd);
        let xdxd = JSON.stringify(ae);
        let xd = xdxd.replace("]", "");
        let asd = `${xd}\n,{"id":"${usuario_id}"}]`;
        fs.writeFileSync('ids_premium_users.json', asd);
    }
};
