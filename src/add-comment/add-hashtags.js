const { logger } = require("../logger/logger");
const { getAppConfig } = require("../helpers/config-selector");
const { putTextIntoRetwittComment } = require("./add-comment");
const { createHashtagsText } = require("./create-hashtags");
const { twittLink } = require("../retwitt/elements");

const {
  hashtags: { isOn },
} = getAppConfig();

const twittContentHasLink = async (page) => {
  const link = await page.$(twittLink);

  if (link) return true;
  return false;
};

const addHashTags = async (page) => {
  if (isOn && !(await twittContentHasLink(page))) {
    const hashtagsText = `${createHashtagsText()} `; // space on the end of string with hashtas is important for close twitter hashtags select
    await putTextIntoRetwittComment(page, hashtagsText);
    logger.info(`Hashtags added.`);
  }
};

module.exports = { addHashTags };
