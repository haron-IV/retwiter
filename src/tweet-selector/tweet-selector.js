const { tweets } = require('./elements');

const tweetSelector = async (page) => {
    const tweetsOnPage = await page.evaluate( () => [...document.querySelectorAll("#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-yfoy6g.r-18bvks7.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > section > div > div > div")]);
    console.log(tweetsOnPage);
};

module.exports = { tweetSelector };