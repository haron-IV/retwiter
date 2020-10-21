const watch = require('melanke-watchjs'); //https://www.npmjs.com/package/melanke-watchjs
const { state, getError } = require('../state/app-state');
const { logger } = require('../logger/logger');
const { initAppAfterError } = require('../../index');

const watchErrors = async page => {
    watch.watch(state, "error", async () => {
        logger.error(`${getError().msg} | Application will restart.`);
        await page.close();
        await initAppAfterError();
        //TODO: add debounce here - fristly check if it need to be debounced
    });
};

module.exports = { watchErrors };