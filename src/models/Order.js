const {Schema, model} = require('mongoose');
const Supplement = require('./Supplement');

const OrderSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    product: [{
        type: Supplement.schema,
        required: true,
        ref: 'Supplement',
    }],
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    address: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Cash'],
        required: true,
    },
}, {
    timestamps: true,
});

const Order = model('Order', OrderSchema);

module.exports = Order;