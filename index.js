require('dotenv').config();
const puppeteer = require('puppeteer');
const { local, prod } = require('./config/browser-config');
const { login } = require('./src/login/login');
const { retweet } = require('./src/retweet/retweet');

const getEnvironment = () => {
    const env = process.env.ENV;
    if(env = "local") return local;
    return prod;
};

const initPage = async () => {
    const browser = await puppeteer.launch(getEnvironment());
    const page = await browser.newPage();
    await page.goto('https://twitter.com');

    return { page, browser };
};

const init = async () => {
    const { page, browser } = await initPage();
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    await retweet(page);


    await browser.close();
};


init();