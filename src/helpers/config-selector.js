const getBrowserConfig = () => {
    const { local, prod } = require('../../config/browser-config');
    const env = process.env.ENV;

    if(env === "local") return local;
    return prod;
};

const getAppConfig = () => {
    const { local, prod } = require('../../config/app-config');
    const env = process.env.APP_CONFIG;

    if(env === "local") return local;
    return prod;
};

module.exports = { getBrowserConfig, getAppConfig };