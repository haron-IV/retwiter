const { logger } = require("../logger/logger");
const { getAppConfig } = require("../helpers/config-selector");
const { putTextIntoRetwittComment } = require("./add-comment");
const { createHashtagsText } = require("./create-hashtags");

const {
  hashtags: { isOn },
} = getAppConfig();

const addHashTags = async (page) => {
  const hashtagsText = `${createHashtagsText()} `; // space on the end of string with hashtas is important for close twitter hashtags select
  //TODO: if posts have a link not add the hashtags cuz this makes post without preview

  if (isOn) {
    await putTextIntoRetwittComment(page, hashtagsText);
    logger.info(`Hashtags added.`);
  }
};

module.exports = { addHashTags };
