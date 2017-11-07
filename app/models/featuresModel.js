var mongoose = require('mongoose');

var FeaturesModel = mongoose.model('features', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'languages'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = FeaturesModel;