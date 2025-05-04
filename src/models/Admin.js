const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin Schema
const adminSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Generate JWT token
adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

// Verify password
adminSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Admin Model
const Admin = model('Admin', adminSchema);

module.exports = Admin;