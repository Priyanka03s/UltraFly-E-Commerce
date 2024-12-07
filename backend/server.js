require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5001; // Use a different port if 5000 is occupied

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://serene-tartufo-11aa62.netlify.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
