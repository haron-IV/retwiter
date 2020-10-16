const { twittSelector } = require('../twitt-selector/twitt-selector');
const { twitterUrl } = require('../../config/app-config');
const { baseLog } = require('../helpers/logs');

const retwitt = async (page) => {
    const twittToShareLink = `${twitterUrl}${await twittSelector(page)}`;
    
    baseLog("Selected twitt to share: ", twittToShareLink);
};

module.exports = { retwitt };