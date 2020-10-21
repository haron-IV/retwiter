const watch = require('melanke-watchjs'); //https://www.npmjs.com/package/melanke-watchjs
const { state, getError } = require('../state/app-state');
const { logger } = require('../logger/logger');
const { initPage } = require('../app-management/browser');
const { login } = require('../login/login');
const { retwitt } = require('../retwitt/retwitt');

const initAppAfterError = async () => {
    const page = await initPage();
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retwitt(page);
};

const watchErrors = async page => {
    watch.watch(state, "error", async () => {
        logger.error(`${getError().msg} | Application will restart.`);
        await page.close();
        await initAppAfterError();
        //TODO: add debounce here - fristly check if it need to be debounced
    });
};

module.exports = { watchErrors };