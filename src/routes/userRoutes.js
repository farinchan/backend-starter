const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware, upload, handleMulterError } = require('../middleware');

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authMiddleware, userController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/profile', 
    authMiddleware, 
    upload.single('picture'), 
    handleMulterError,
    userController.updateProfile
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete current user account
 * @access  Private
 */
router.delete('/profile', authMiddleware, userController.deleteAccount);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only - you can add admin middleware here)
 * @access  Private
 */
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
