const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('auth-token');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        
        // Verify user still exists
        const user = await User.findByPk(decoded.user_id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token is valid but user no longer exists.'
            });
        }

        req.user = decoded;
        req.userInfo = user;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token.'
        });
    }
};

module.exports = authMiddleware;
