const state = {
    retwittedPosts: 0
};

const increaseRetwitedPostsCount = () => state.retwittedPosts++;
const getRetwitedPostCount = () => state.retwittedPosts;

module.exports = { increaseRetwitedPostsCount, getRetwitedPostCount };