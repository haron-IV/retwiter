const retwittedPosts = require('../models/retwitted-posts');

const saveRetwittedPost = obj => {
    try {
        const RetwittedPostModel = require('../models/retwitted-posts');
        const retwittedPost = new RetwittedPostModel(obj);

        return retwittedPost.save().catch( err => console.log(err));
    } catch ( err ) {
        console.error(err);
    }
};

module.exports = { saveRetwittedPost };