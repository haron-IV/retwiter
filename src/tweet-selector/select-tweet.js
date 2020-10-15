const { selectTweetNotOlderThanHours } = require('../../config/app-config');

const checkIfItIsHoursAgo = time => time.slice(-1)[0] === "h";
const checkIfItIsMinutesAgo = time => time.slice(-1)[0] === "m";
const formatTimeToNumber = formatedTime => {
    formatedTime.pop();

    return JSON.parse(formatedTime.join(''));
};

const selectTweet = async (page, tweetsTime) => {
    for (const tweetTime of tweetsTime) {
        const time = await page.evaluate(tweetTime => tweetTime.textContent, tweetTime);
        const formatedTime = time.match(/[0-9hm]/g);
        let selectedTweet = null;

        if (checkIfItIsHoursAgo(time)) {
            const timeAgo = formatTimeToNumber(formatedTime);
            if (timeAgo < selectTweetNotOlderThanHours) selectedTweet = tweetTime;
        }

        if (checkIfItIsMinutesAgo(time)) selectedTweet = tweetTime;

        return selectedTweet;
    }
};

module.exports = selectTweet;