const { retwittBtn, confirmRetwittBtn, twittAuthorNameHolder } = require('./elements');
const { saveRetwittedPost } = require('../database-management/repository/retwitted-post-repository');
const { createFullDate } = require('../helpers/date');
const { waitSecBeforeClickRetwittButtons } = require('../../config/app-config');
const { calcSecToMs, delay } = require('../helpers/time');
const { logger } = require('../logger/logger');
const { increaseRetwitedPostsCount, getRetwitedPostCount, setError } = require('../state/app-state');

const clickRetwittButton = async page => {
    try {
        await delay(calcSecToMs(waitSecBeforeClickRetwittButtons));
        await page.waitForSelector(retwittBtn, { visible: true});
        await page.evaluate(retwittBtn => document.querySelector(retwittBtn).click(), retwittBtn);
    } catch {
        setError({ msg: "Error: clickRetwittButton()", appPID: process.pid});
    }
};

const getTwittAutor = async page => {
    try {
        const twittAuthorEl = await page.$(twittAuthorNameHolder);
        const twittAuthor = await page.evaluate(twittAuthorEl => twittAuthorEl.textContent, twittAuthorEl);

        return twittAuthor;
    } catch {
        setError({ msg: "Error: getTwittAutor()", appPID: process.pid});
    }
};

const confirmRetwitt = async (page, twittUrl) => {
    try {
        await delay(calcSecToMs(waitSecBeforeClickRetwittButtons));
        await page.waitForSelector(confirmRetwittBtn, { visible: true});
        await page.click(confirmRetwittBtn);
        saveRetwittedPost({
            twittUrl: twittUrl,
            retwittDate: createFullDate(),
            retwittedFrom: await getTwittAutor(page)
        });
        increaseRetwitedPostsCount();
        logger.info(`Post retwitted. Retwitted ${getRetwitedPostCount()} posts since start.`);
    } catch {
        setError({ masg: "Error: confirmRetwitt()", appPID: process.pid });
    }
};

module.exports = { clickRetwittButton,  confirmRetwitt };