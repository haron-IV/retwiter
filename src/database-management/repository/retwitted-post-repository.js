const RetwittedPostModel = require('../models/retwitted-posts');
const { logger } = require('../../logger/logger');

const saveRetwittedPost = obj => {    
    const retwittedPost = new RetwittedPostModel(obj);
    
    return retwittedPost.save().catch( err => { 
        logger.error(err);
    });
};

const getRetwittedPostByUrl =  postUrl => {
    return RetwittedPostModel.find({twittUrl: postUrl}, twittList => {
        return twittList;
    })
    .catch(err => logger.error(err));
};

const getAllRetwittedPosts = () => {
    return RetwittedPostModel.find({}, twittList => twittList).
    catch(err = > logger.error(err));
};

module.exports = { saveRetwittedPost, getRetwittedPostByUrl, getAllRetwittedPosts };