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
    const browser = browser;
    watch.watch(state, "error", async browser => {
        logger.error(`${getError()} | Application will restart.`);
        await browser.close();
        await init();
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