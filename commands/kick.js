module.exports = {
    name: "kick",
    aliases: [],
    permissions: [],
    description: "Kick a member from the server!",
    execute(client, message, arguments, Discord) {
        const member = message.mentions.users.first();
        if (message.member.roles.cache.has(process.env.MOD_ROLE_ID)) {
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                message.channel.send("User has been kicked!");
            } else {
                message.channel.send("Mention somebody you want to kick!");
            };
        } else {
            message.channel.send("You do not have sufficient permissions to carry out this command!")
        };
    },
};