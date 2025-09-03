const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

async function getUser(req, res) {
    try {
        if (!req.user) return res.status(401).json({ error: 'You must be logged in to see this!' });
        const foundUser = await User.findById(req.user._id).select('-password');
        res.status(200).json(foundUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

async function registerUser(req, res) {
    try {
        // If a user with this email is found
        const foundUser = await User.findOne({ email: req.body.email });

        // If a user is found
        if (foundUser !== null) throw new Error('This user already exists');

        // Create a new instance for the user and save to database
        const createdUser = await User.create(req.body);
        const jwtSecretKey = process.env.JWT_SECRET;
        const payload = {
            _id: createdUser._id,

        }

        jwt.sign(
            { data: payload },
            jwtSecretKey,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) throw error;
                res.status(201).json({ success: 'User created successfully', token });
            }
        )
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const foundUser = await User.findOne({ email: req.body.email }).select('+password');
        if (!foundUser) return res.status(400).json({ error: 'Incorrect email.' });

        // Pass in the password that's coming from the request
        const isPasswordCorrect = await foundUser.isCorrectPassword(req.body.password);
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect password.' })

        const jwtSecretKey = process.env.JWT_SECRET;
        const payload = {
            _id: foundUser._id,
        }

        jwt.sign(
            { data: payload },
            jwtSecretKey,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ success: 'User logged in successfully', token });
            }
        )
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getUser,
    registerUser,
    loginUser
}