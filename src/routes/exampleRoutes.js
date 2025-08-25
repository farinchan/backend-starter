const express = require('express');
const { exampleController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

/**
 * @route   GET /api/example/test
 * @desc    Test endpoint with authentication
 * @access  Private
 */
router.get('/test', authMiddleware, exampleController.test);

/**
 * @route   GET /api/example/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', exampleController.health);

module.exports = router;
