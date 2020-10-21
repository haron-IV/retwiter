const watch = require('melanke-watchjs'); //https://www.npmjs.com/package/melanke-watchjs
const { state, getError, getBrowser } = require('../state/app-state');
const { logger } = require('../logger/logger');
const { initPage } = require('../app-management/browser');
const { retwitt } = require('../retwitt/retwitt');

const initAppAfterError = async () => {
    const page = await initPage(await getBrowser());
    await retwitt(page);
};

const restartApp = async page => {
    logger.error(`${getError().msg} | Application will restart.`);
    await page.close();
    await initAppAfterError();
    //TODO: add debounce here - fristly check if it need to be debounced
};

const watchErrors = async page => {
    watch.watch(state, "error", async () => {
        await restartApp(page);
    });
};

module.exports = { watchErrors };