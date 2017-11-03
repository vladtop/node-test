var mongoose = require('mongoose');

// make mongoose use promises by setting it to use the built-in promise lib
mongoose.Promise = global.Promise;
// connect to DB
mongoose.connect('mongodb://localhost:27017/realestate').catch((error) => {
    console.log('Unable to connect to DB');
});

module.exports = mongoose;