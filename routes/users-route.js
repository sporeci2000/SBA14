const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/user-controller');
const verifyAuthentication = require('../middleware/auth-middleware');

// Pass in the middleware and this middleware is going to run before the route handeler runs
// Makes sure the user is authenticated 
router.get('/', verifyAuthentication, authController.getUser);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    authController.getUser

)

// GitHub OAuth
router.get('/github', passport.authenticate('github', { session: false }));

// GitHub callback
router.get(
    '/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res) => {
        if (!req.user) return res.status(401).json({ error: 'Authentication failed' });

        // Sign JWT
        const token = jwt.sign(
            { _id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return JWT in JSON
        res.status(200).json({ success: 'GitHub login successful', token });
    }
);

module.exports = router;
