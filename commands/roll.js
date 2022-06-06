const Profile = require("./../models/Profile");

module.exports = {
    name: "roll",
    aliases: [],
    permissions: [],
    description: "Roll a die and maybe win some coins",
    async execute(client, message, arguments, Discord, cmd, profileData) {
        const dice = ["1", "2", "3", "4", "5", "6"];
        const botNumber = dice[Math.floor(Math.random() * 6)];
        if (!arguments[0]) return message.channel.send("Please include a number to compare against!");
        if (arguments[0] > 6 || arguments[0] < 1) return message.channel.send("Please enter a number between 1 and 6!");
        if (arguments[0] === botNumber) return message.channel.send("It is a draw!");

        const winner = botNumber > arguments[0] ? "Bot" : message.author.username;
        if (winner === message.author.username) await Profile.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: 500 } });
        if (winner === "Bot") await Profile.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: -500 } });

        const rollEmbed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setTitle(`Winner of the roll is ${winner}!`)
            .setDescription(`Bot rolled ${botNumber}, and you rolled ${arguments[0]}.\n You ${winner === message.author.username ? "won" : "lost"} 500 coins!`);
        message.channel.send(rollEmbed);
    },
};