module.exports = {
    name: "clear",
    aliases: [],
    permissions: [],
    description: "Clear a certain number of messages!",
    async execute(client, message, arguments, Discord) {
        if (!arguments[0]) return message.reply("You must specifiy a number of messages to be deleted!");
        if (isNaN(arguments[0])) return message.reply("Please a number to clear messages!");
        if (arguments[0] > 100) return message.reply("The maximum number of messages that can be cleared is 100!");
        if (arguments[0] < 1) return message.reply("You think I am dumb? You can't clear 0 or negative number of messages!");

        await message.channel.messages.fetch({ limit: arguments[0] }).then(messages => message.channel.bulkDelete(messages));
    },
};