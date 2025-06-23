const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    // Check karein ke request header mein 'Authorization' hai aur 'Bearer' se shuru hota hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Header se token hasil karein ('Bearer' lafz ko hata kar)
            token = req.headers.authorization.split(' ')[1];

            // Token ko verify karein
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Token ke payload se user ID nikal kar database se user ka data hasil karein
            // Password ko chhor kar baaqi sab data select karein
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            // Agle middleware ya controller par jayein
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = authMiddleware;