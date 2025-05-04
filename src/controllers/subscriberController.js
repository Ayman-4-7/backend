const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Subscriber = require('../models/Subscriber');

// Helper function to generate JWT
const generateToken = (subscriberId) => {
    return jwt.sign({ id: subscriberId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup logic
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                success: false,
                message: 'Subscriber already exists',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new subscriber
        const subscriber = new Subscriber({
            name,
            email,
            password: hashedPassword,
        });

        await subscriber.save();

        // Generate JWT token
        const token = generateToken(subscriber._id);

        res.status(201).json({
            success: true,
            data: {
                id: subscriber._id,
                name: subscriber.name,
                email: subscriber.email,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the subscriber exists
        const subscriber = await Subscriber.findOne({ email });
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found',
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, subscriber.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate JWT token
        const token = generateToken(subscriber._id);

        res.status(200).json({
            success: true,
            data: {
                id: subscriber._id,
                name: subscriber.name,
                email: subscriber.email,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get subscriber profile logic
exports.getProfile = async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.subscriber.id).select('-password');
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found',
            });
        }
        res.status(200).json({
            success: true,
            data: subscriber,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update subscriber profile logic
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Find and update the subscriber
        const subscriber = await Subscriber.findByIdAndUpdate(
            req.subscriber.id,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found',
            });
        }

        res.status(200).json({
            success: true,
            data: subscriber,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete subscriber logic
exports.deleteProfile = async (req, res) => {
    try {
        const subscriber = await Subscriber.findByIdAndDelete(req.subscriber.id);
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subscriber deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get all subscribers logic
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().select('-password');
        res.status(200).json({
            success: true,
            data: subscribers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get subscriber by id logic
exports.getSubscriberById = async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id).select('-password');
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Subscriber not found',
            });
        }
        res.status(200).json({
            success: true,
            data: subscriber,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};