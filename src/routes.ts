import { Dataset, createPlaywrightRouter } from "crawlee";

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        selector: "#wt-watches a.rcard",
        label: "Listings",
        limit: 1,
    });
});

router.addHandler("Listings", async ({ request, page, log }) => {
    const price = await page
        .locator(".js-price-shipping-country")
        .textContent();

    // XPath expression to target the Referenznummer
    const referenznummerXPath =
        '//tr/td[contains(., "Referenznummer")]/following-sibling::td/a';
    // Extract the Referenznummer using the XPath expression
    const referenceNumber = await page.$eval(
        referenznummerXPath,
        (elem) => elem.textContent,
        { xpath: true }
    );

    // CSS selector to target the condition text inside the button
    const conditionSelector = "span.border-0 > button.js-conditions";
    // Extract the condition text using the CSS selector
    const condition = await page.$eval(
        conditionSelector,
        (elem) => elem.textContent
    );

    // XPath expression to target the Lieferumfang text
    const lieferumfangXPath =
        '//tr/td[contains(., "Lieferumfang")]/following-sibling::td/div';

    // Extract the Lieferumfang text using the XPath expression
    let boxOrPapers = await page.$eval(
        lieferumfangXPath,
        (elem) =>
            elem.childNodes.length > 0 ? elem.childNodes[0].textContent : "",
        { xpath: true }
    );
    if (boxOrPapers !== null) boxOrPapers = boxOrPapers.trim();
    else boxOrPapers = "";

    const withBox = boxOrPapers.includes("Mit Original-Box");
    const withPapers = boxOrPapers.includes("Mit Original-Papieren");

    log.info(`${referenceNumber}, ${price}, ${condition}, ${boxOrPapers}`, {
        url: request.loadedUrl,
    });

    await Dataset.pushData({
        url: request.loadedUrl,
        referenceNumber,
        price,
        condition,
        withBox,
        withPapers,
    });
});
