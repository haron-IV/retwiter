const { tweets } = require('./elements');

const tweetSelector = async (page) => {
    await page.waitForSelector(tweets);
    const tweetsOnPage = await page.$$(tweets);
    console.log(tweetsOnPage);
};

module.exports = { tweetSelector };