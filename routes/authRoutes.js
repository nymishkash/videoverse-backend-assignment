const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env; // Load your JWT secret from environment variables
const User = require('../models/userModel');

// POST /auth/register - Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const user = await User.create({ username, passwordHash });
        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user.');
    }
});

// POST /auth/login - Authenticate user and return JWT token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(401).send('Invalid username or password');
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in.');
    }
});

module.exports = router;
