require('dotenv').config();
const { login } = require('./src/login/login');
const { retwitt } = require('./src/retwitt/retwitt');
const { connectToDb } = require('./src/database-management/index');
const { logo } = require('./src/helpers/logo');
const { initPage, initBrowser } = require('./src/app-management/browser');
const { watchErrors } = require('./src/helpers/errors');

// TODO: update readme and docs with maved sh files infto direcotry /scripts
// TODO: add hshtags to posts

const initApp = async () => {
    const browser = await initBrowser();
    const page = await initPage(browser);
    logo();
    connectToDb();
    watchErrors(page);
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retwitt(page);
};

const initAppAfterError = async () => {
    const page = await initPage();
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retwitt(page);
};

initApp();

module.exports = { initAppAfterError };