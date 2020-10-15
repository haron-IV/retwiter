const { tweetSelector } = require('../tweet-selector/tweet-selector');
const { tweeterUrl } = require('../../config/app-config');
const { baseLog } = require('../helpers/logs');

const retweet = async (page) => {
    const tweetToShareLink = `${tweeterUrl}${await tweetSelector(page)}`;
    
    baseLog("Selected tweet to share: ", tweetToShareLink);
};

module.exports = { retweet };