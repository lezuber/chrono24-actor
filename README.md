# chrono24-actor based onCrawlee & Playwright & Chrome template

Web scraper example with Crawlee, Playwright and headless Chrome. Playwright is more modern, user-friendly and harder to block than Puppeteer.

## Getting Started

### Install Apify CLI

#### Using Homebrew

```Bash
brew install apify/tap/apify-cli
```

#### Using NPM

```Bash
npm -g install apify-cli
```

### Create a new Actor using this template

```Bash
apify create my-typescript-actor -t project_playwright_crawler_ts
```

### Run the Actor locally

```Bash
cd my-typescript-actor
apify run
```

## Deploy on Apify

### Log in to Apify

You will need to provide your [Apify API Token](https://console.apify.com/account/integrations) to complete this action.

```Bash
apify login
```

### Deploy your Actor

This command will deploy and build the Actor on the Apify Platform. You can find your newly created Actor under [Actors -> My Actors](https://console.apify.com/actors?tab=my).

```Bash
apify push
```

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

-   [Apify SDK for TypeScript documentation](https://docs.apify.com/sdk/js)
-   [Apify Platform documentation](https://docs.apify.com/platform)
-   [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
