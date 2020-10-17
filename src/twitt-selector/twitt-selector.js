const { twittTime } = require('./elements');
const selectTwitt = require('./select-twitt');

const twittSelector = async (page, browser) => {
    await page.waitForSelector(twittTime);
    const twittsTime = await page.$$(twittTime);
    const selectedTwitt = await selectTwitt(page, twittsTime);
    const twittLink = await page.evaluate(selectedTwitt => selectedTwitt.parentNode.getAttribute("href"), selectedTwitt);

    return twittLink;
};

module.exports = { twittSelector };