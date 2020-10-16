require('dotenv').config();
const mongoose = require('mongoose');
const { infoLog } = require('../helpers/logs');

const connectToDb = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
        infoLog("Database Connected.");
    }).catch( err => console.log(err));
};

module.exports = { connectToDb };