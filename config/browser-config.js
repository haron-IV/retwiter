const local = {
    headless: false,
    defaultViewport: null,
    args: []
};

const prod = {
    headless: true,
    defaultViewport: null,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
};

module.exports = { local, prod };