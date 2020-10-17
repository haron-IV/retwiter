const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: add user which retwitted
const retwittedPostModel = new Schema({
    twittUrl: {
        type: String
    },
    retwittDate: {
        type: String
    },
    retwittedFrom: {
        type: String
    }
});

module.exports = mongoose.model("RetwittedPosts", retwittedPostModel);