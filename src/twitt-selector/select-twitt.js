const { selectTwittNotOlderThanHours } = require('../../config/app-config');

const checkIfItIsHoursAgo = time => time.slice(-1)[0] === "h";
const checkIfItIsMinutesAgo = time => time.slice(-1)[0] === "m";
const formatTimeToNumber = formatedTime => {
    formatedTime.pop();

    return JSON.parse(formatedTime.join(''));
};

const selectTwitt = async (page, twittsTime) => {
    for (const twittTime of twittsTime) {
        const time = await page.evaluate(twittTime => twittTime.textContent, twittTime);
        const formatedTime = time.match(/[0-9hm]/g);
        let selectedTwitt = null;

        if (checkIfItIsHoursAgo(time)) {
            const timeAgo = formatTimeToNumber(formatedTime);
            if (timeAgo < selectTwittNotOlderThanHours) selectedTwitt = twittTime;
        }

        if (checkIfItIsMinutesAgo(time)) selectedTwitt = twittTime;

        return selectedTwitt;
    }
};

module.exports = selectTwitt;