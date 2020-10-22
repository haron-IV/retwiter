const puppeteer = require('puppeteer');
const { getBrowserConfig } = require('../helpers/config-selector');
const { getAppConfig } = require('../helpers/config-selector');
const { twitterBaseUrlWithEnLang } = getAppConfig();

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