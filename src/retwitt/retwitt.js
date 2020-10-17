const { twittSelector } = require('../twitt-selector/twitt-selector');
const { twitterBaseUrl, langQuery } = require('../../config/app-config');
const { baseLog, actionLog } = require('../helpers/logs');
const { retwittBtn, confirmRetwittBtn, twittAuthorNameHolder } = require('./elements');
const { saveRetwittedPost } = require('../database-management/repository/retwitted-post-repository');
const { createFullDate } = require('../helpers/date');
const { wasTwittShared } = require('./was-twitt-shared');
const { calcMinsToMs, delay } = require('../helpers/time');
const { URLwithLangQuery } = require('../helpers/url-builder');

const clickRetwittButton = async page => {
    await delay(4000);
    await page.waitForSelector(retwittBtn, { visible: true});
    await page.evaluate(retwittBtn => document.querySelector(retwittBtn).click(), retwittBtn);
};

const getTwittAutor = async page => {
    const twittAuthorEl = await page.$(twittAuthorNameHolder);
    const twittAuthor = await page.evaluate(twittAuthorEl => twittAuthorEl.textContent, twittAuthorEl);

    return twittAuthor;
};

const confirmRetwitt = async (page, twittUrl) => {
    await delay(4000);
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
    await page.goto(URLwithLangQuery('/home'));
    await delay(calcMinsToMs(1));

    const twittToShareLink = URLwithLangQuery(await twittSelector(page));
    baseLog("Selected twitt to share: ", twittToShareLink);
    if (!await wasTwittShared(twittToShareLink)) {
        await page.goto(twittToShareLink);
        await clickRetwittButton(page);
        await confirmRetwitt(page, twittToShareLink);    
        await delay(calcMinsToMs(15));
        await retwitt(page);
    } else {
        actionLog("Twitt was already shared.")
        await delay(calcMinsToMs(2));
        await retwitt(page);
    }
};

module.exports = { retwitt };