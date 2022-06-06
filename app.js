require("dotenv").config({ path: "./config.env" });

const Discord = require("discord.js");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const mongoose = require("mongoose");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command-handler", "event-handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGO_SRV.replace("<PASSWORD>", process.env.MONGO_PASSWORD))
    .then(() => console.log("Successfully to the database!"))
    .catch(error => console.log(`Oh no something went wrong...${error}.`));
    
client.login(process.env.TOKEN);