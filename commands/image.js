const imageScraper = require("images-scraper");
const google = new imageScraper({ puppeteer: { headless: true } });

module.exports = {
    name: "image",
    aliases: ["img"],
    permissions: [],
    description: "Sends an image from Google",
    async execute(client, message, arguments, Discord) {
        const imageQuery = arguments.join(" ");
        if (!imageQuery) return message.channel.send("Please send some text to query from Google!");
        const imageResults = await google.scrape(imageQuery, 1);
        message.channel.send(imageResults[0].url);
    },
};