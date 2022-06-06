module.exports = {
    name: "reactionrole",
    aliases: ["reactrole", "rr"],
    permissions: [],
    description: "Sets up a reaction role message!",
    async execute(client, message, arguments, Discord) {
        const pythonRole = message.guild.roles.cache.find(role => role.name === "Python Dev");
        const javascriptRole = message.guild.roles.cache.find(role => role.name === "JavaScript Dev");
        const golangRole = message.guild.roles.cache.find(role => role.name === "Golang Dev");
        const cplusplusRole = message.guild.roles.cache.find(role => role.name === "C++ Dev");

        const pythonEmoji = "💙";
        const javascriptEmoji = "💛";
        const golangEmoji = "💚";
        const cplusplusEmoji = "🖤";

        const newEmbed = new Discord.MessageEmbed()
            .setColor("#42643")
            .setTitle("Choose a team to play on!")
            .setDescription("Choosing a team will allow you to interact with your teammates! \n\n" + `${pythonEmoji} for Python Devs\n` + `${javascriptEmoji} for JavaScript Devs.\n` + `${cplusplusEmoji} for C++ Devs.\n` + `${golangEmoji} for Golang Devs.`);
        const messageEmbed = await message.channel.send(newEmbed);
        messageEmbed.react(pythonEmoji);
        messageEmbed.react(javascriptEmoji);
        messageEmbed.react(cplusplusEmoji);
        messageEmbed.react(golangEmoji);

        client.on("messageReactionAdd", async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == process.env.GET_ROLES_CHANNEL_ID) {
                if (reaction.emoji.name === pythonEmoji) await reaction.message.guild.members.cache.get(user.id).roles.add(pythonRole);
                if (reaction.emoji.name === javascriptEmoji) await reaction.message.guild.members.cache.get(user.id).roles.add(javascriptRole);
                if (reaction.emoji.name === cplusplusEmoji) await reaction.message.guild.members.cache.get(user.id).roles.add(cplusplusRole);
                if (reaction.emoji.name === golangEmoji) await reaction.message.guild.members.cache.get(user.id).roles.add(golangRole);
            } else {
                return;
            };
        });

        client.on("messageReactionRemove", async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == process.env.GET_ROLES_CHANNEL_ID) {
                if (reaction.emoji.name === pythonEmoji) await reaction.message.guild.members.cache.get(user.id).roles.remove(pythonRole);
                if (reaction.emoji.name === javascriptEmoji) await reaction.message.guild.members.cache.get(user.id).roles.remove(javascriptRole);
                if (reaction.emoji.name === cplusplusEmoji) await reaction.message.guild.members.cache.get(user.id).roles.add(cplusplusRole);
                if (reaction.emoji.name === golangEmoji) await reaction.message.guild.members.cache.get(user.id).roles.add(golangRole);
            } else {
                return;
            };
        });
    },
};