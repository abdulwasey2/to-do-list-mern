const express = require('express');
const router = express.Router();

// Controller functions ko import karein (hum inhein agle step mein banayenge)
const {
    registerUser,
    loginUser
} = require('../controllers/user.controller');

// Route for user registration
// POST /api/users/register
router.post('/register', registerUser);

// Route for user login
// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;