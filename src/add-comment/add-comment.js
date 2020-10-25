const { tweetTextHolder } = require("../retwitt/elements");
const { typeDelay } = require("../helpers/navigation");
const { setError } = require("../state/app-state");

const putTextIntoRetwittComment = async (page, text) => {
  try {
    await page.waitForSelector(tweetTextHolder);
    await page.type(tweetTextHolder, text, typeDelay);
  } catch {
    logger.error(`putTextIntoRetwittComment() -> ${text}`);
    setError({ msg: "putTextIntoRetwittComment()", appPID: process.pid });
  }
};

module.exports = { putTextIntoRetwittComment };
