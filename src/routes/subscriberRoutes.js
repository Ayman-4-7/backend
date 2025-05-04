const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

// Signup route
router.post('/signup', subscriberController.signup);

// Login route
router.post('/login', subscriberController.login);

// Get subscriber profile
router.get('/profile', subscriberController.getProfile);

// Update subscriber profile
router.put('/profile', subscriberController.updateProfile);

// Delete subscriber profile
router.delete('/profile', subscriberController.deleteProfile);

// Get all subscribers
router.get('/', subscriberController.getAllSubscribers);

// Get subscriber by ID
router.get('/:id', subscriberController.getSubscriberById);

module.exports = router;