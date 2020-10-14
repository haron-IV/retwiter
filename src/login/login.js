const { usernameInp, passwordInp, loginBtn } = require('./elements');
const { typeDelay } = require('../helpers/navigation');

const login = async (page, username, password) => {
    await page.waitForSelector(usernameInp);
    await page.type(usernameInp, username, typeDelay);
    await page.type(passwordInp, password, typeDelay);
    const btn = await page.$(loginBtn);
    await btn.evaluate(btn => btn.click());
    await page.waitForNavigation();
    console.log(`User ${username} logged in.`);
};


module.exports = { login };