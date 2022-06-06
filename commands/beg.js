const Profile = require("./../models/Profile");

module.exports = {
    name: "beg",
    aliases: [],
    permissions: [],
    description: "Beg for coins",
    async execute(client, message, arguments, Discord, cmd, profileData) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        await Profile.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: randomNumber } });
        return message.channel.send(`${message.author.username}, you begged and received ${randomNumber} **coins**!`);   
    },
};