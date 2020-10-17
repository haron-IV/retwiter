const RetwittedPostModel = require('../models/retwitted-posts');

const saveRetwittedPost = obj => {
    try {        
        const retwittedPost = new RetwittedPostModel(obj);

        return retwittedPost.save().catch( err => console.log(err));
    } catch ( err ) {
        console.error(err);
    }
};

const getRetwittedPostByUrl =  postUrl => {
    return RetwittedPostModel.find({twittUrl: postUrl}, twittList => {
        return twittList;
    })
    .catch(err => console.error(err));
};

const getAllRetwittedPosts = () => {
    return RetwittedPostModel.find({}, twittList => twittList);
};

module.exports = { saveRetwittedPost, getRetwittedPostByUrl, getAllRetwittedPosts };