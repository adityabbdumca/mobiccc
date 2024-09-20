const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password || username.trim() === '') {
        return res.status(400).json({ msg: 'Username and password are required and cannot be empty.' });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username is already taken.' });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        // Save user in database
        await user.save();
        res.status(201).json({ msg: 'User registered successfully!' });
    } catch (err) {
        console.error('Error registering user:', err);  // Log error to console
        res.status(500).json({ msg: 'Server error: ' + err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
