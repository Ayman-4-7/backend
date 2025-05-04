const mongoose = require('mongoose');
const Photo = require('./Photo'); 

const { Schema } = mongoose;

const ExericesSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    plan: {
        type: String,
        enum: ['GYM', 'HOME'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    detailedDescription: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
    intensityLevel: {
        type: String,
        enum: [
            'no equipment',
            'quick exercise',
            'abs focus',
            'flexibility',
            'muscle building',
            'hyper strength and power',
            'weight lift and endurance',
            'recovery and mobility',
        ],
        required: true,
    },
    photo: {
        type: Photo,
        required: true,
        ref: 'Photo',
    },
});

const Exerices = mongoose.model('Exerices', ExericesSchema);

module.exports = Exerices;