const Profile = require("./../../models/Profile");

module.exports = async (Discord, client, message) => {
    const PREFIX = "!";
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    let profileData;
    try {
        profileData = await Profile.findOne({ userID: message.author.id });
        if (!profileData) await Profile.create({ userID: message.author.id, serverID: message.guild.id, bank: 0 }); 
    } catch (error) {
        console.log(`Oh no, something went wrong...${error}.`);
    };
    
    const arguments = message.content.slice(PREFIX.length).split(/ +/);
    const cmd = arguments.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(alias => alias.aliases && alias.aliases.includes(cmd));

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ];

    if (command.permissions.length) {
        let invalidPermissions = [];
        for (const permission of command.permissions) {
            if (!validPermissions.includes(permission)) return console.log(`Invalid permission coded...${permission}!`);
            if (!message.member.hasPermission(permission)) invalidPermissions.push(permission);
        };
        if (invalidPermissions.length) return message.channel.send(`Missing Permissions: \` ${invalidPermissions}!\``);
    };

    if (command) command.execute(client, message, arguments, Discord, cmd, profileData);
};