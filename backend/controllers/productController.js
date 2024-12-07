const Product = require('../models/Product');

const addProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

const getProducts = async (req, res) => {
    const { page = 1, limit = 10, sort = 'name' } = req.query;
    try {
        const products = await Product.find()
            .sort({ [sort]: 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Product.countDocuments();

        res.status(200).json({
            data: products,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

module.exports = { addProduct, getProducts };
