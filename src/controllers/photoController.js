const cloudinary = require('../configs/cloudinary');
const Photo = require('../models/Photo');

// Upload a photo
exports.uploadPhoto = async (req, res) => {
    try {
        const file = req.file; // Assuming you're using a middleware like multer for file uploads

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path);

        // Save photo details to the database
        const photo = new Photo({
            photoLink: result.secure_url,
        });

        await photo.save();

        res.status(201).json({
            success: true,
            data: photo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all photos
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json({
            success: true,
            data: photos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a photo by ID
exports.getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({
                success: false,
                message: 'Photo not found',
            });
        }
        res.status(200).json({
            success: true,
            data: photo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete a photo by ID
exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({
                success: false,
                message: 'Photo not found',
            });
        }

        // Delete from Cloudinary
        const publicId = photo.photoLink.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId);

        // Delete from database
        await photo.remove();

        res.status(200).json({
            success: true,
            message: 'Photo deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};