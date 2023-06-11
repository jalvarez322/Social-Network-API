const mongoose = require('mongoose');

const connectString = process.env.MONGODB_URL || 'mongodb://127.0.0.1::27017socialDB';
connect(connectString);

module.exports = connection;