const { twittSelector } = require('../twitt-selector/twitt-selector');
const { baseLog, actionLog } = require('../helpers/logs');
const { waitMinsAfterGoToHome, waitMinsAfterRetwitt, waitMinsAfterSelectingAlreadyRetwittedPost } = require('../../config/app-config');
const { wasTwittShared } = require('./was-twitt-shared');
const { calcMinsToMs, delay } = require('../helpers/time');
const { URLwithLangQuery } = require('../helpers/url-builder');
const { clickRetwittButton,  confirmRetwitt } = require('./page-actions');

const retwitt = async (page) => {
    await page.goto(URLwithLangQuery('/home'));
    await delay(calcMinsToMs(waitMinsAfterGoToHome));

    const twittToShareLink = URLwithLangQuery(await twittSelector(page));
    baseLog("Selected twitt to share: ", twittToShareLink);
    if (!await wasTwittShared(twittToShareLink)) {
        await page.goto(twittToShareLink);
        await clickRetwittButton(page);
        await confirmRetwitt(page, twittToShareLink);    
        await delay(calcMinsToMs(waitMinsAfterRetwitt));
        await retwitt(page);
    } else {
        actionLog("Twitt was already shared.")
        await delay(calcMinsToMs(waitMinsAfterSelectingAlreadyRetwittedPost));
        await retwitt(page);
    }
};

module.exports = { retwitt };