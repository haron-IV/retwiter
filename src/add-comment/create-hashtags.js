const { randNumberFromZeroTo } = require("../helpers/random-number");
const { getAppConfig } = require("../helpers/config-selector");

const {
  hashtags: { hashtagsArrays },
} = getAppConfig();

const selectHashtagsArray = () => {
  const selectedArrayNumber = randNumberFromZeroTo(hashtagsArrays.length - 1);
  const hashtags = hashtagsArrays[selectedArrayNumber].slice(); //slice for not copying reference
  hashtags.unshift("");

  return hashtags;
};

const createHashtagsText = () => {
  // TODO: after few times string have empty hash at the start of the sting
  const hashtags = selectHashtagsArray();
  return hashtags
    .map((hashtag) => (hashtag[-1] = `#${hashtag}`))
    .slice(1, hashtags.length - 1)
    .join(" ");
};

module.exports = { createHashtagsText };
