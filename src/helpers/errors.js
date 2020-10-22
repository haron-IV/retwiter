const watch = require('melanke-watchjs'); //https://www.npmjs.com/package/melanke-watchjs
const debounce = require('lodash.debounce');
const { state, getError, getBrowser } = require('../state/app-state');
const { logger } = require('../logger/logger');
const { initPage } = require('../app-management/browser');
const { retwitt } = require('../retwitt/retwitt');
const { delay, calcSecToMs } = require('./time');

const secondsToRestart = 5;

const initAppAfterError = async () => {
    const page = await initPage(await getBrowser());
    logger.info("New page opened.")
    await retwitt(page);
};

const restartApp = async page => {
    logger.error(`${getError().msg} | Application will restart after ${secondsToRestart}s.`); //TODO: sometimes getError is undefined
    await delay(calcSecToMs(secondsToRestart));
    await page.close();
    logger.info("Page closed.");
    await delay(calcSecToMs(secondsToRestart));
    await initAppAfterError();
    //TODO: add debounce here - fristly check if it need to be debounced
};

const watchErrors = async page => {
    watch.watch(state, "error", async () => {
        debounce(await restartApp(page), 1000);
    });
};

module.exports = { watchErrors };