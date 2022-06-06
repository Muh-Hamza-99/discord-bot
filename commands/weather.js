const weather = require("weather-js");

module.exports = {
    name: "weather",
    aliases: [],
    permissions: [],
    description: "Get the weather for a specific location",
    async execute(client, message, arguments, Discord, cmd) {
        if (!arguments[0]) return message.channel.send("Please specify a location!");
        weather.find({ search: arguments.join(" "), degreeType: "C" }, function (error, result){
            if (result === undefined || result.length === 0) return message.channel.send("**Invalid** location!");

            const current = result[0].current;
            const location = result[0].location;
            const weatherEmbed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x111111)
                .addField("Timezone", `UTC${location.timezone}`, true)
                .addField("Degree Type", "Celsius", true)
                .addField("Temperature", `${current.temperature}°`, true)
                .addField("Wind", current.winddisplay, true)
                .addField("Feels like", `${current.feelslike}°`, true)
                .addField("Humidity", `${current.humidity}%`, true);
            message.channel.send(weatherEmbed);
        });     
    },
};