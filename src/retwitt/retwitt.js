const { logger } = require('../logger/logger');
const { getAppConfig } = require('../helpers/config-selector');
const { wasTwittShared } = require('./was-twitt-shared');
const { calcMinsToMs, delay } = require('../helpers/time');
const { URLwithLangQuery } = require('../helpers/url-builder');
const { clickRetwittButton,  confirmRetwitt, likeTwitt, checkAuthorBeforeShare } = require('./page-actions');
const { twittLink } = require('./create-twitt-link');
const { addHashTags } = require('../hashtags/add-hashtags');

const { waitMinsAfterGoToHome, waitMinsAfterRetwitt, waitMinsAfterSelectingAlreadyRetwittedPost } = getAppConfig();

const shareTwittAndRepeat = async (page, twittToShareLink) => {
    logger.info(`Selected twitt to share:  ${twittToShareLink}`);
    await page.goto(twittToShareLink);
    if (await checkAuthorBeforeShare(page)) {
        await likeTwitt(page);
        await clickRetwittButton(page);
        await addHashTags(page);
        await confirmRetwitt(page, twittToShareLink);    
        await delay(calcMinsToMs(waitMinsAfterRetwitt));
    }
    await retwitt(page);
};

const twittWasAlreadyShared = async page => {
    logger.warn("Twitt was already shared.");
    await delay(calcMinsToMs(waitMinsAfterSelectingAlreadyRetwittedPost));
    await retwitt(page);
};

const retwitt = async (page) => {
    await page.goto(await URLwithLangQuery('/home'));
    await delay(calcMinsToMs(waitMinsAfterGoToHome));
    const twittToShareLink = await twittLink(page);
    
    if (twittToShareLink) {
        if (!await wasTwittShared(twittToShareLink)) await shareTwittAndRepeat(page, twittToShareLink);
        else await twittWasAlreadyShared(page);
    } else {
        await retwitt(page);
    }
};

module.exports = { retwitt };