module.exports = {
    name: "balance",
    aliases: ["bal"],
    permissions: [],
    description: "Checks the user's balance",
    execute(client, message, arguments, Discord, cmd, profileData) {
        const balanceEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.username}'s Wallet & Bank!`)
            .addField("Wallet: ", profileData.coins)
            .addField("Bank:", profileData.bank);

        message.channel.send(balanceEmbed);
    },
};