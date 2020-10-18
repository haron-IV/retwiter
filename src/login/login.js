const { usernameInp, passwordInp, loginBtn } = require('./elements');
const { typeDelay } = require('../helpers/navigation');
const { logger } = require('../logger/logger');
const { securityLogin } = require('./security-login');

const login = async (page, username, password) => {
    await page.waitForSelector(usernameInp);
    await page.type(usernameInp, username, typeDelay);
    await page.type(passwordInp, password, typeDelay);
    await page.click(loginBtn);
    await page.waitForNavigation();
    await securityLogin(page);

    logger.info(`User: ${username} logged in.`);
};

module.exports = { login };