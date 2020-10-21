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
        
        if (twittLink !== undefined) {
            return twittLink;
        }else {
            logger.rror("twittSelector() -> twittLink is undefined");
            setError({ msg: "Error: twittSelector() -> twittLink is undefined", appPID: process.pid });
        }
        
        
    } catch {
        setError({ msg: "Error: twittSelector()", appPID: process.pid });
    }
};

module.exports = { twittSelector };