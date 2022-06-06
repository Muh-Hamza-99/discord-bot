module.exports = {
    name: "unmute",
    aliases: [],
    permissions: [],
    description: "Removes a harsh mute role to a member not adhering to the rules!",
    execute(client, message, arguments, Discord) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === "Member");
            let muteRole = message.guild.roles.cache.find(role => role.name === "Mute");
            let memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted!`);
        } else {
            message.channel.send("Could not find that member!");
        };
    },
};