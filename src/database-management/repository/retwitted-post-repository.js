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

const getRetwittedPostByUrl =  postUrl => {
    const RetwittedPostModel = require('../models/retwitted-posts');
    return RetwittedPostModel.find({twittUrl: postUrl}, twittList => {
        return twittList;
    })
    .catch(err => console.error(err));
};

const getAllRetwittedPosts = () => {
    const RetwittedPostModel = require('../models/retwitted-posts');
    return RetwittedPostModel.find({}, twittList => twittList);
};

module.exports = { saveRetwittedPost, getRetwittedPostByUrl, getAllRetwittedPosts };