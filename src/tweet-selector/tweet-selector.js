const { tweetTime } = require('./elements');
const selectTweet = require('./select-tweet');

// TODO:
/*
check tweet in db
if tweet isn't in db retweet it
*/

const tweetSelector = async (page) => {
    await page.waitForSelector(tweetTime);
    const tweetsTime = await page.$$(tweetTime);
    const selectedTweet = await selectTweet(page, tweetsTime);
    const tweetLink = await page.evaluate(selectedTweet => selectedTweet.parentNode.getAttribute("href"), selectedTweet);
};

module.exports = { tweetSelector };