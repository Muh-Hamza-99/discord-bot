const Profile = require("./../models/Profile");

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    permissions: [],
    description: "Deposit coins into your bank",
    async execute(client, message, arguments, Discord, cmd, profileData) {
        const amount = arguments[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a positive, whole number!");
        try {
            if (amount > profileData.coins) return message.channel.send("You don't enough coins to deposit into your bank!");
            await Profile.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: -amount, bank: amount } });
            return message.channel.send(`You deposited ${amount} of coins into your bank!`);
        } catch (error) {
            console.log(`Oh no...something went wrong ${error}.`)
        };
    },
};