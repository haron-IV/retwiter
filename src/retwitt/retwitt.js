const { twittSelector } = require('../twitt-selector/twitt-selector');
const { twitterBaseUrl } = require('../../config/app-config');
const { baseLog, actionLog } = require('../helpers/logs');
const { retwittBtn, confirmRetwittBtn, twittAuthorNameHolder } = require('./elements');
const { saveRetwittedPost } = require('../database-management/repository/retwitted-post-repository');
const { createFullDate } = require('../helpers/date');

const clickRetwittButton = async page => { 
    await page.waitForSelector(retwittBtn, { visible: true});
    await page.click(retwittBtn);
};

const getTwittAutor = async page => {
    const twittAuthorEl = await page.$(twittAuthorNameHolder);
    const twittAuthor = await page.evaluate(twittAuthorEl => twittAuthorEl.textContent, twittAuthorEl);

    return twittAuthor;
};

const confirmRetwitt = async (page, twittUrl) => {
    await page.waitForSelector(confirmRetwittBtn, { visible: true});
    await page.click(confirmRetwittBtn);
    saveRetwittedPost({
        twittUrl: twittUrl,
        retwittDate: createFullDate(),
        retwittedFrom: await getTwittAutor(page)
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