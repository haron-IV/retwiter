const { twittSelector } = require('../twitt-selector/twitt-selector');
const { twitterUrl } = require('../../config/app-config');
const { baseLog, actionLog } = require('../helpers/logs');
const { retwittBtn, confirmRetwittBtn } = require('./elements');

const clickRetwittButton = async page => { 
    await page.waitForSelector(retwittBtn, { visible: true});
    await page.click(retwittBtn);
};

const confirmRetwitt = async page => {
    await page.waitForSelector(confirmRetwittBtn, { visible: true});
    await page.click(confirmRetwittBtn);
};

const retwitt = async (page) => {
    const twittToShareLink = `${twitterUrl}${await twittSelector(page)}`;
    baseLog("Selected twitt to share: ", twittToShareLink);
    await page.goto(twittToShareLink);
    await clickRetwittButton(page);
    await confirmRetwitt(page);
    actionLog("Post retwitted");
};

module.exports = { retwitt };