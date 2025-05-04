const express = require('express');
const asyncHandler = require('express-async-handler');
const ContactUs = require('../models/contactUsModel');

// @desc    Get contact information
// @route   GET /api/contact-us
// @access  Public
const getContactInfo = asyncHandler(async (req, res) => {
    const contactInfo = await ContactUs.findOne(); // Assuming there's only one document
    if (!contactInfo) {
        res.status(404);
        throw new Error('Contact information not found');
    }
    res.status(200).json({
        success: true,
        data: contactInfo,
    });
});

// @desc    Update contact information
// @route   PUT /api/contact-us
// @access  Private/Admin
const updateContactInfo = asyncHandler(async (req, res) => {
    const { location, contactEmail, contactPhone, workingHours } = req.body;

    const contactInfo = await ContactUs.findOne(); // Assuming there's only one document
    if (!contactInfo) {
        res.status(404);
        throw new Error('Contact information not found');
    }

    contactInfo.location = location || contactInfo.location;
    contactInfo.contactEmail = contactEmail || contactInfo.contactEmail;
    contactInfo.contactPhone = contactPhone || contactInfo.contactPhone;
    contactInfo.workingHours = workingHours || contactInfo.workingHours;

    const updatedContactInfo = await contactInfo.save();

    res.status(200).json({
        success: true,
        data: updatedContactInfo,
    });
});

module.exports = {
    getContactInfo,
    updateContactInfo,
};