const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Add a new product
router.post('/api/products/add', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required.' });
    }

    try {
        const newProduct = new Product({ name, price });
        await newProduct.save(); // Save product to MongoDB
        res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product.' });
    }
});


// Fetch all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from MongoDB
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products.' });
    }
});

module.exports = router;
