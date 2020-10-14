const { tweetSelector } = require('../tweet-selector/tweet-selector');

const retweet = async (page) => {
    await tweetSelector(page);
};

module.exports = { retweet };