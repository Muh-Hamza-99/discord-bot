const fs = require("fs");

module.exports = (client, Discord) => {
    const loadDirectories = directories => {
        const eventFiles = fs.readdirSync(`./events/${directories}`).filter(file => file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = require(`../events/${directories}/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, Discord, client));
        };
    };
    
    ["client", "guild"].forEach(event => loadDirectories(event));
};