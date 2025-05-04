const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    photoLink: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;