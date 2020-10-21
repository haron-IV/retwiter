const state = {
    retwittedPosts: 0,
    error: { 
        msg: null,
        appPID: null
    }
};

const increaseRetwitedPostsCount = () => state.retwittedPosts++;
const getRetwitedPostCount = () => state.retwittedPosts;

const setError = payload => state.error = payload;
const getError = () => state.error;

module.exports = { state, increaseRetwitedPostsCount, getRetwitedPostCount, setError, getError};