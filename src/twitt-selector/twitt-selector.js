const { twittTime } = require('./elements');
const selectTwitt = require('./select-twitt');
const { setError } = require('../state/app-state');
const { logger } = require('../logger/logger');
const { getTwittAutor } = require('../retwitt/page-actions');

const twittSelector = async page => {
    try {
        await page.waitForSelector(twittTime);
        const twittsTime = await page.$$(twittTime);
        const selectedTwitt = await selectTwitt(page, twittsTime);
        const twittLink = await page.evaluate(selectedTwitt => selectedTwitt.parentNode.getAttribute("href"), selectedTwitt);
        const twittAuthor = await getTwittAutor(page);
        if (twittLink === undefined) setError({ msg: "twittSelector() -> twittLink is undefined", appPID: process.pid });
        if (twittAuthor === process.env.DISPLAY_USERNAME) setError({ msg: "twittSelector() -> Cannto share your own twitt", appPID: process.pid });
        
        return twittLink;
    } catch {
        setError({ msg: "twittSelector()", appPID: process.pid });
        logger.error("twittSelector()");
    }
};

module.exports = { twittSelector };