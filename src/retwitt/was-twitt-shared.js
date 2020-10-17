const { getRetwittedPostByUrl } = require('../database-management/repository/retwitted-post-repository');

const wasTwittShared = async (twittUrl) => {
    const twitt = await getRetwittedPostByUrl(twittUrl);
    if (twitt.length === 0) return false;
    return true;
};

module.exports = { wasTwittShared };