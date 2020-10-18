const { retwittBtn, confirmRetwittBtn, twittAuthorNameHolder } = require('./elements');
const { saveRetwittedPost } = require('../database-management/repository/retwitted-post-repository');
const { createFullDate } = require('../helpers/date');
const { waitSecBeforeClickRetwittButtons } = require('../../config/app-config');
const { calcSecToMs, delay } = require('../helpers/time');
const { actionLog } = require('../helpers/logs');
const { increaseRetwitedPostsCount, getRetwitedPostCount } = require('../../app-state');

const clickRetwittButton = async page => {
    try {
        await delay(calcSecToMs(waitSecBeforeClickRetwittButtons));
        await page.waitForSelector(retwittBtn, { visible: true});
        await page.evaluate(retwittBtn => document.querySelector(retwittBtn).click(), retwittBtn);
    } catch {

    }
};

const getTwittAutor = async page => {
    const twittAuthorEl = await page.$(twittAuthorNameHolder);
    const twittAuthor = await page.evaluate(twittAuthorEl => twittAuthorEl.textContent, twittAuthorEl);

    return twittAuthor;
};

const confirmRetwitt = async (page, twittUrl) => {
    await delay(calcSecToMs(waitSecBeforeClickRetwittButtons));
    await page.waitForSelector(confirmRetwittBtn, { visible: true});
    await page.click(confirmRetwittBtn);
    saveRetwittedPost({
        twittUrl: twittUrl,
        retwittDate: createFullDate(),
        retwittedFrom: await getTwittAutor(page)
    });
    increaseRetwitedPostsCount();
    actionLog(`Post retwitted. Retwitted ${getRetwitedPostCount()} posts since start.`);
};

module.exports = { clickRetwittButton,  confirmRetwitt };