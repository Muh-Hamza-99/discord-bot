const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    serverID: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        default: 1000,
    },
    bank: Number,
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;