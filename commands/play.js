const YTDL = require("ytdl-core");
const YTSearch = require("yt-search");

const queue = new Map();

module.exports = {
    name: "play",
    aliases: ["skip", "stop"],
    permissions: [],
    description: "Joins and plays a video from Youtube!",
    async execute(client, message, arguments, Discord, cmd) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to execute this command!");
        
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("You don't have sufficient permissions!");
        if (!permissions.has("SPEAK")) return message.channel.send("You don't have sufficient permissions!");

        const serverQueue = queue.get(message.guild.id);
        if (cmd === "play") {
            if (!arguments.length) return message.channel.send("You need to send the name of a video/a link!");
            let song = {};
            if (YTDL.validateURL(arguments[0])) {
                const songInfo = await YTDL.getInfo(arguments[0]);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
            } else {
                const videoFinder = async query => {
                    const videoResult = await YTSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                };
                const video = await videoFinder(arguments.join(" "));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send("Error finding video!");
                };
            };
            if (!serverQueue) {
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: [],
                };
                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);
                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (error) {
                    queue.delete(message.guild.id);
                    message.channel.send("There was an error connecting!");
                    throw error;
                };
            } else {
                serverQueue.songs.push(song);
                return message.channel.send(`:fire: ***${song.title}*** added to queue!`);
            };
        } else if (cmd === "skip") skipSong(message, serverQueue);
        else if (cmd === "stop") stopSong(message, serverQueue);
    },
};

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    };
    const stream = YTDL(song.url, { filter: "audioonly" });
    songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on("finish", () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
        });
    await songQueue.textChannel.send(`Now playing ***${song.title}***`);
};

const skipSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to execute this command!");
    if (!serverQueue) {
        return message.channel.send("There are no songs in the server queue!");
    };
    serverQueue.connection.dispatcher.end();
};

const stopSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to execute this command!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
};