const express = require('express');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database'); // Import sequelize instance
const User = require('./models/userModel'); // Import User model

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

app.use(bodyParser.json());

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Define routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/videos', videoRoutes); // Protected video routes

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
