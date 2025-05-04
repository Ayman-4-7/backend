const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.loginAdmin);

// Update admin password route
router.put('/update-password', adminController.updateAdminPassword);

module.exports = router;