const { Schema, model } = require('mongoose');

const contactUsSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true,
    },
    workingHours: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const ContactUs = model('ContactUs', contactUsSchema);

module.exports = ContactUs;