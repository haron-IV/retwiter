const { logger } = require('../logger/logger');
const { tweetTextHolder } = require('../retwitt/elements');
const { typeDelay } = require('../helpers/navigation');
const { getAppConfig } = require('../helpers/config-selector');
const { randNumberFromZeroTo } = require('../helpers/random-number');

const {  hashtags: { isOn },  hashtags: { hashtagsArrays } } = getAppConfig();

const putTextIntoRetwittComment = async (page, text) => {
    await page.waitForSelector(tweetTextHolder);
    await page.type(tweetTextHolder, text, typeDelay);
};

const selectHashtagsArray = () => {
    const selectedArrayNumber = randNumberFromZeroTo(hashtagsArrays.length - 1);
    const hashtags = hashtagsArrays[selectedArrayNumber];
    hashtags.unshift('');

    return hashtags;
};

const createHashtagsText = () => {
    const hashtags = selectHashtagsArray();
    return hashtags
        .map( hashtag => hashtag[-1] = `#${hashtag}`)
        .slice(1, hashtags.length-1)
        .join(" ");
};

const addHashTags = async page => {
    const hashtagsText = `${createHashtagsText()} `; // space on the end of string with hashtas is important for close twitter hashtags select
    if (isOn) { 
        await putTextIntoRetwittComment(page, hashtagsText);
        logger.info(`Hashtags added.`);
    }
};

module.exports = { addHashTags,  putTextIntoRetwittComment};