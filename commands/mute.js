const ms = require("ms");

module.exports = {
    name: "mute",
    aliases: ["silent"],
    permissions: [],
    description: "Adds a harsh mute role to a member not adhering to the rules!",
    execute(client, message, arguments, Discord) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === "Member");
            let muteRole = message.guild.roles.cache.find(role => role.name === "Mute");
            let memberTarget = message.guild.members.cache.get(target.id);
            if (!arguments[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted!`);
                return;
            };
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(arguments[1]))}!`);
            setTimeout(function() {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(arguments[1]));
        } else {
            message.channel.send("Could not find that member!");
        };
    },
};