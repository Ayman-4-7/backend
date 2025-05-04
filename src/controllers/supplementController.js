const Supplement = require('../models/Supplement');

// Create a new supplement
exports.createSupplement = async (req, res) => {
    try {
        const { productName, productDescription, price, quantity } = req.body;
        const newSupplement = new Supplement({ productName, productDescription, price, quantity });
        const savedSupplement = await newSupplement.save();
        res.status(201).json(savedSupplement);
    } catch (error) {
        res.status(500).json({ message: 'Error creating supplement', error });
    }
};

// Update a supplement by ID
exports.updateSupplement = async (req, res) => {
    try {
        const { productName, productDescription, price, quantity } = req.body;
        const updatedSupplement = await Supplement.findByIdAndUpdate(
            req.params.id,
            { productName, productDescription, price, quantity },
            { new: true, runValidators: true }
        );
        if (!updatedSupplement) {
            return res.status(404).json({ message: 'Supplement not found' });
        }
        res.status(200).json(updatedSupplement);
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplement', error });
    }
};
