const Profile = require("../../models/Profile");

module.exports = async (Discord, client, member) => {
    await Profile.create({
        userID: member.id,
        serverID: member.guild.id,
        bank: 0,
    });
};