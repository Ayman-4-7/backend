const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to upload a photo
router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

// Route to get all photos
router.get('/', photoController.getAllPhotos);

// Route to get a photo by ID
router.get('/:id', photoController.getPhotoById);

// Route to delete a photo by ID
router.delete('/:id', photoController.deletePhoto);

module.exports = router;