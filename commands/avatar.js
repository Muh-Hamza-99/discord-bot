module.exports = {
    name: "avatar",
    aliases: ["icon", "pfp", "profilepic"],
    permissions: [],
    description: "Return a user(s) avatar picture!",
    execute(client, message, arguments, Discord, cmd) {
        if (!message.mentions.users.size) return message.channel.send(`**Your Avatar: ** ${message.author.displayAvatarURL({ dynamic: true })}`);
        const avatarList = message.mentions.users.map(user => `**${user.username}'s Avatar: ** ${user.displayAvatarURL({ dynamic: true })}`);
        message.channel.send(avatarList);
    },
};