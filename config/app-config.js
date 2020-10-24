// comments beside values are default values
const local = {
    twitterBaseUrl: "https://twitter.com",
    twitterBaseUrlWithEnLang: "https://twitter.com?lang=en",
    langQuery: "?lang=en",
    selectTwittNotOlderThanHours: 2, //2
    waitMinsAfterGoToHome: 1, //1
    waitMinsAfterRetwitt: 1, //15
    waitMinsAfterSelectingAlreadyRetwittedPost: 1, //2
    waitSecBeforeClickRetwittButtons: 2,
    secondsToRestart: 5,
    hashtags: {
        isOn: true,
        hashtagsArrays: [
            ['takJest', 'polska', 'takSieDzieje', 'news'],
            ['sport', 'retweet', 'covid', 'prostoZmostu']
        ]
    }
};

const prod = {
    twitterBaseUrl: "https://twitter.com",
    twitterBaseUrlWithEnLang: "https://twitter.com?lang=en",
    langQuery: "?lang=en",
    selectTwittNotOlderThanHours: 2, //2
    waitMinsAfterGoToHome: 1, //1
    waitMinsAfterRetwitt: 1, //15
    waitMinsAfterSelectingAlreadyRetwittedPost: 1, //2
    waitSecBeforeClickRetwittButtons: 2,
    secondsToRestart: 25,
    hashtags: {
        isOn: process.env.HASHTAGS,
        hashtagsArrays: [
            ['takJest', 'polska', 'takSieDzieje', 'news'],
            ['sport', 'retweet', 'covid', 'prostoZmostu']
        ]
    }
};

module.exports = { local, prod };