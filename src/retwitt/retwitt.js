const { twittSelector } = require('../twitt-selector/twitt-selector');
const { twitterBaseUrl } = require('../../config/app-config');
const { baseLog, actionLog } = require('../helpers/logs');
const { retwittBtn, confirmRetwittBtn } = require('./elements');
const { saveRetwittedPost } = require('../database-management/repository/retwitted-post-repository');
const { createFullDate } = require('../helpers/date');

const clickRetwittButton = async page => { 
    await page.waitForSelector(retwittBtn, { visible: true});
    await page.click(retwittBtn);
};

const confirmRetwitt = async (page, twittUrl) => {
    await page.waitForSelector(confirmRetwittBtn, { visible: true});
    await page.click(confirmRetwittBtn);
    saveRetwittedPost({
        twittUrl: twittUrl,
        retwittDate: createFullDate(),
        retwittedFrom: "Test"
    });
    actionLog("Post retwitted");
};

const retwitt = async (page) => {
    const twittToShareLink = `${twitterBaseUrl}${await twittSelector(page)}`;
    baseLog("Selected twitt to share: ", twittToShareLink);
    await page.goto(twittToShareLink);
    await clickRetwittButton(page);
    await confirmRetwitt(page, twittToShareLink);
};

module.exports = { retwitt };