const { twittTime } = require('./elements');
const selectTwitt = require('./select-twitt');
const { setError } = require('../../app-state');

const twittSelector = async (page) => {
    try {
        await page.waitForSelector(twittTime);
        const twittsTime = await page.$$(twittTime);
        const selectedTwitt = await selectTwitt(page, twittsTime);
        const twittLink = await page.evaluate(selectedTwitt => selectedTwitt.parentNode.getAttribute("href"), selectedTwitt);
        
        if (twittLink !== undefined) {
            return twittLink;
        }else {
            console.log("Jebac PIS")
            debugger;
            setError("Error: twittSelector() -> twittLink is undefined");
        }
        
        
    } catch {
        setError("Error: twittSelector()");
    }
};

module.exports = { twittSelector };