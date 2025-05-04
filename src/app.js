const express = require('express');
const app = express();
const subscriberRoutes = require('./routes/subscriberRoutes');
const photoRoutes = require('./routes/photoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configure MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;