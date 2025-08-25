const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');
const exampleRoutes = require('./exampleRoutes');

const router = express.Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/example', exampleRoutes);

// API Info endpoint
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Backend API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            todos: '/api/todos',
            example: '/api/example'
        }
    });
});

module.exports = router;
