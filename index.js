require('dotenv').config();
const puppeteer = require('puppeteer');
const { local, prod } = require('./config/browser-config');
const { twitterBaseUrlWithEnLang } = require('./config/app-config');
const { login } = require('./src/login/login');
const { retwitt } = require('./src/retwitt/retwitt');
const { connectToDb } = require('./src/database-management/index');
const { logo } = require('./logo');
const { state, getError } = require('./app-state');
const watch = require('melanke-watchjs'); //https://www.npmjs.com/package/melanke-watchjs
const { logger } = require('./src/logger/logger');

// TODO: update readme and docs with maved sh files infto direcotry /scripts
// TODO: add hshtags to posts


const getBrowserConfig = () => {
    const env = process.env.ENV;
    if(env === "local") return local;
    return prod;
};

const initPage = async () => {
    const browser = await puppeteer.launch(getBrowserConfig());
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");
    await page.setViewport({ width: 1440, height: 754 });
    await page.goto(twitterBaseUrlWithEnLang);

    return { page, browser };
};

const watchErrors = async browser => {
    watch.watch(state, "error", async () => {
        const pid = process.pid; //TODO: move to place with erorr
        logger.error(`${getError()} | Application will restart.`);
        await browser.close(); // TODO: except to close browser just close the page then open it again - not restarting whole application needed
        await init();
        process.kill(pid); //TODO: find a way to kill old process of node
        // TODO: add disconnection from mongo
        //TODO: add debounce here
    });
};

const init = async () => {
    const { page, browser } = await initPage();
    logo();
    connectToDb();
    watchErrors(browser);
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retwitt(page, browser);
};

init();