/**
 * This template is a production ready boilerplate for developing with `PlaywrightCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

// For more information, see https://docs.apify.com/sdk/js
import { Actor } from "apify";
// For more information, see https://crawlee.dev
import { PlaywrightCrawler } from "crawlee";
import { router } from "./routes.js";
import { InputSchema } from "./input_schema.js";

// Initialize the Apify SDK
await Actor.init();

const { refNumber } = (await Actor.getInput()) as InputSchema;

// const proxyConfiguration = await Actor.createProxyConfiguration();

const searchURL = `https://www.chrono24.de/search/index.htm?dosearch=true&query=${encodeURIComponent(
    refNumber
)}&sortorder=1`;

console.log(`Watch reference number ${refNumber}. So URL is: ${searchURL}`);

const crawler = new PlaywrightCrawler({
    // proxyConfiguration,
    requestHandler: router,
});

await crawler.run([searchURL]);

// Exit successfully
await Actor.exit();
