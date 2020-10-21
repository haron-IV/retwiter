const state = {
    retwittedPosts: 0,
    error: { 
        msg: null,
        appPID: null
    },
    browser: null
};

const increaseRetwitedPostsCount = () => state.retwittedPosts++;
const getRetwitedPostCount = () => state.retwittedPosts;

const setError = payload => state.error = payload;
const getError = () => state.error;

const setBrowser = payload => state.browser = payload;
const getBrowser = async () => await state.browser;

module.exports = { state, increaseRetwitedPostsCount, getRetwitedPostCount, setError, getError, setBrowser, getBrowser};