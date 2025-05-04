const { Schema, model } = require('mongoose');

const SubscriberSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['Standard', 'Premium', 'VIP'],
        required: true,
        default: 'standard',
    },
    password: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
});

module.exports = model('Subscriber', SubscriberSchema);