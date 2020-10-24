const { tweetTextHolder } = require('../retwitt/elements');
const { typeDelay } = require('../helpers/navigation');

const putTextIntoRetwittComment = async (page, text) => {
    await page.waitForSelector(tweetTextHolder);
    await page.type(tweetTextHolder, text, typeDelay);
};

const addHashTags = async page => {
    await putTextIntoRetwittComment(page, "elo");
};

module.exports = { addHashTags };