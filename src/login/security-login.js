const { securityUsernameInp, securityPasswordInp, securityLoginBtn } = require('./elements');
const { typeDelay } = require('../helpers/navigation');

const isSecurityLoginNeeded = async (page) => {
    const currentURL = await page.url();
    if (!currentURL.includes("login?email_disabled=true")) return false;
    return true;
};

const login = async (page, username, password) => {
    await page.waitForSelector(securityUsernameInp);
    await page.type(securityUsernameInp, username, typeDelay);
    await page.type(securityPasswordInp, password, typeDelay);
    await page.click(securityLoginBtn);
    await page.waitForNavigation();
};


const securityLogin = async (page) => {
    if(await isSecurityLoginNeeded(page)) {
        await login(page, process.env.REAL_USERNAME, process.env.PASSWORD);
    }
};

module.exports = { securityLogin };