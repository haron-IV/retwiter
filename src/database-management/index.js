require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('../logger/logger');

const connectToDb = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
        logger.info("Database Connected.");
    }).catch( err => console.log(err));
};

module.exports = { connectToDb };