const local = {
    headless: false,
    defaultViewport: null,
    args: [
        '--window-size=1920,1080'
    ]
};

const prod = {
    headless: true,
    defaultViewport: null,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
};

module.exports = {local, prod};