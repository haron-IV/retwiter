require('dotenv').config();
const { login } = require('./src/login/login');
const { retwitt } = require('./src/retwitt/retwitt');
const { connectToDb } = require('./src/database-management/index');
const { logo } = require('./src/helpers/logo');
const { initPage, initBrowser } = require('./src/app-management/browser');
const { watchErrors } = require('./src/helpers/errors');
const { setBrowser } = require('./src/state/app-state');

// TODO: update readme and docs with maved sh files infto direcotry /scripts
// TODO: add to script that starts applicaition killall chrome at start for clear ram

const initApp = async () => {
    const browser = await initBrowser();
    await setBrowser(browser);
    const page = await initPage(browser);
    logo();
    connectToDb();
    watchErrors(page);
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retwitt(page);
};

initApp();