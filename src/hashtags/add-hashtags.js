const { logger } = require('../logger/logger');
const { tweetTextHolder } = require('../retwitt/elements');
const { typeDelay } = require('../helpers/navigation');
const { getAppConfig } = require('../helpers/config-selector');
const { randNumberFromZeroTo } = require('../helpers/random-number');

const {  hashtags: { isOn },  hashtags: { hashtagsArrays } } = getAppConfig();

const putTextIntoRetwittComment = async (page, text) => {
    selectHashtagsArray();
    await page.waitForSelector(tweetTextHolder);
    await page.type(tweetTextHolder, text, typeDelay);
};

const selectHashtagsArray = () => {
    const selectedArrayNumber= randNumberFromZeroTo(hashtagsArrays.length - 1);
    const hashtags = hashtagsArrays[selectedArrayNumber];
    
    return hashtags;
};

const addHashTags = async page => {
    if (isOn) await putTextIntoRetwittComment(page, "elo");
    else logger.info("Adding hashtages isn't turned on.");
    
};

module.exports = { addHashTags };