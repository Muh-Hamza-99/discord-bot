const Profile = require("./../models/Profile");

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    permissions: [],
    description: "Withdraw coins into your bank",
    async execute(client, message, arguments, Discord, cmd, profileData) {
        const amount = arguments[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdraw amount must be a positive, whole number!");
        try {
            if (amount > profileData.bank) return message.channel.send("You don't enough coins to withdraw from your bank!");
            await Profile.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: amount, bank: -amount } });
            return message.channel.send(`You withdrew ${amount} of coins into your bank!`);
        } catch (error) {
            console.log(`Oh no...something went wrong ${error}.`)
        };
    },
};