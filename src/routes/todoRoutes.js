const express = require('express');
const { todoController } = require('../controllers');
const { authMiddleware } = require('../middleware');

const router = express.Router();

/**
 * @route   GET /api/todos
 * @desc    Get all todos for current user
 * @access  Private
 * @query   page, limit, status
 */
router.get('/', authMiddleware, todoController.getAllTodos);

/**
 * @route   POST /api/todos
 * @desc    Create a new todo
 * @access  Private
 */
router.post('/', authMiddleware, todoController.createTodo);

/**
 * @route   GET /api/todos/stats
 * @desc    Get todo statistics for current user
 * @access  Private
 */
router.get('/stats', authMiddleware, todoController.getTodoStats);

/**
 * @route   GET /api/todos/:id
 * @desc    Get todo by ID
 * @access  Private
 */
router.get('/:id', authMiddleware, todoController.getTodoById);

/**
 * @route   PUT /api/todos/:id
 * @desc    Update todo by ID
 * @access  Private
 */
router.put('/:id', authMiddleware, todoController.updateTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete todo by ID
 * @access  Private
 */
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
