const express = require('express');
const router = express.Router();
const passport = require('passport');
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

module.exports = router;

