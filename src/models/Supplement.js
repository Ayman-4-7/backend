const { Schema, model } = require('mongoose');

const SupplementSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});

module.exports = model('Supplement', SupplementSchema);