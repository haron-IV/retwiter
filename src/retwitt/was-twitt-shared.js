const { getRetwittedPostByUrl } = require('../database-management/repository/retwitted-post-repository');
const { setError } = require('../state/app-state');

const wasTwittShared = async (twittUrl) => {
    try {
        const twitt = await getRetwittedPostByUrl(twittUrl);
        if (twitt.length === 0) return false;
        return true;
    } catch {
        setError({ msg:"wasTwittShared()", appPID: process.pid });
    }
};

module.exports = { wasTwittShared };