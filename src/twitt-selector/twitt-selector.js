const { twittTime } = require('./elements');
const selectTwitt = require('./select-twitt');
const { setError } = require('../state/app-state');
const { logger } = require('../logger/logger');

const twittSelector = async (page) => {
    try {
        await page.waitForSelector(twittTime);
        const twittsTime = await page.$$(twittTime);
        const selectedTwitt = await selectTwitt(page, twittsTime);
        const twittLink = await page.evaluate(selectedTwitt => selectedTwitt.parentNode.getAttribute("href"), selectedTwitt);
        console.log(`--- twittlink: ${twittLink} (1)`);
        if (twittLink !== undefined) {
            console.log(`--- twittlink: ${twittLink} (2)`);
            return twittLink;
        } else {
            console.log(`--- twittlink: ${twittLink} (3)`);
            logger.error("twittSelector() -> twittLink is undefined");
            setError({ msg: "twittSelector() -> twittLink is undefined", appPID: process.pid });
        }
        
    } catch {
        setError({ msg: "twittSelector()", appPID: process.pid });
    }
};

module.exports = { twittSelector };