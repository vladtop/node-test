var mongoose = require('mongoose');

var LanguagesModel = mongoose.model('languages', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    code: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = LanguagesModel;