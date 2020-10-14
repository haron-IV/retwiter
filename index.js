require('dotenv').config();
const puppeteer = require('puppeteer');
const browserConfig = require('./config/browser-config');
const { login } = require('./src/login/login');

const initPage = async () => {
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
    await page.goto('https://twitter.com');

    return page;
};

const init = async () => {
    const page = await initPage();
    await login(page, process.env.USERNAME, process.env.PASSWORD);
    
    await browser.close();
};


init();