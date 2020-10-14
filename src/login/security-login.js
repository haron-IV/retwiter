const { securityUsernameInp, securityPasswordInp, securityLoginBtn } = require('./elements');
const { typeDelay } = require('../helpers/navigation');

const isSecurityLoginNeeded = async (page) => {
    const currentURL = await page.url();
    if (!currentURL.includes("login?email_disabled=true")) return;
};

const login = async (page, username, password) => {
    await page.waitForSelector(securityUsernameInp);
    await page.type(securityUsernameInp, username, typeDelay);
    await page.type(securityPasswordInp, password, typeDelay);
    const btn = await page.$(securityLoginBtn);
    await btn.evaluate(btn => btn.click());
    await page.waitForNavigation();
};


const securityLogin = async (page) => {
    await isSecurityLoginNeeded(page);
    await login(page, process.env.REAL_USERNAME, process.env.PASSWORD);
};

module.exports = { securityLogin };