const puppeteer = require('puppeteer');
const { twitterBaseUrlWithEnLang } = require('../../config/app-config');
const { local, prod } = require('../../config/browser-config');

const getBrowserConfig = () => {
    const env = process.env.ENV;
    if(env === "local") return local;
    return prod;
};

const initBrowser = async () => {
    return await puppeteer.launch(getBrowserConfig());
};

const initPage = async browser => {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");
    await page.setViewport({ width: 1440, height: 754 });
    await page.goto(twitterBaseUrlWithEnLang);

    return  page;
};

module.exports = { initPage, initBrowser };