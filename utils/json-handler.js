const fs = require('fs');

function readJSON(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file at ${filePath}:`, error);
        return [];
    }
}

function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to JSON file at ${filePath}:`, error);
    }
}

function addUserToBlacklist(userId) {
    const blacklist = readJSON('blacklist_users.json');
    if (!blacklist.find(user => user.id === userId)) {
        blacklist.push({ id: userId });
        writeJSON('blacklist_users.json', blacklist);
    }
}

function addPremiumUser(userId) {
    const premiumUsers = readJSON('ids_premium_users.json');
    if (!premiumUsers.find(user => user.id === userId)) {
        premiumUsers.push({ id: userId });
        writeJSON('ids_premium_users.json', premiumUsers);
    }
}

function readPremiumConfigs() {
    return readJSON('config_premium_users.json');
}

function writePremiumConfigs(configs) {
    writeJSON('config_premium_users.json', configs);
}


module.exports = {
    readJSON,
    writeJSON,
    addUserToBlacklist,
    addPremiumUser,
    readPremiumConfigs,
    writePremiumConfigs
};
