const { logger } = require('../logger/logger');
const { tweetTextHolder } = require('../retwitt/elements');
const { typeDelay } = require('../helpers/navigation');
const { getAppConfig } = require('../helpers/config-selector');
const { randNumberFromZeroTo } = require('../helpers/random-number');
const { setError } = require('../state/app-state');

const {  hashtags: { isOn },  hashtags: { hashtagsArrays } } = getAppConfig();

const putTextIntoRetwittComment = async (page, text) => {
    try {
        await page.waitForSelector(tweetTextHolder);
        await page.type(tweetTextHolder, text, typeDelay);
    } catch {
        logger.error(`putTextIntoRetwittComment() -> ${text}`);
        setError({ msg: "putTextIntoRetwittComment()", appPID: process.pid });
    }
    
};

const selectHashtagsArray = () => {
    const selectedArrayNumber = randNumberFromZeroTo(hashtagsArrays.length - 1);
    const hashtags = hashtagsArrays[selectedArrayNumber];
    hashtags.unshift('');

    return hashtags;
};

const createHashtagsText = () => {
    // TODO: after few times string have empty hash at the start of the sting
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