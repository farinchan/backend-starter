const { todoService } = require('../services');
const { sendSuccess, sendCreated } = require('../utils');

class TodoController {
    async getAllTodos(req, res, next) {
        try {
            const { page = 1, limit = 10, status } = req.query;
            const result = await todoService.getAllTodos(
                req.user.user_id, 
                page, 
                limit, 
                status
            );
            sendSuccess(res, 'Todos retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async createTodo(req, res, next) {
        try {
            const todo = await todoService.createTodo(req.user.user_id, req.body);
            sendCreated(res, 'Todo created successfully', todo);
        } catch (error) {
            next(error);
        }
    }

    async getTodoById(req, res, next) {
        try {
            const todo = await todoService.getTodoById(req.params.id, req.user.user_id);
            sendSuccess(res, 'Todo retrieved successfully', todo);
        } catch (error) {
            next(error);
        }
    }

    async updateTodo(req, res, next) {
        try {
            const todo = await todoService.updateTodo(
                req.params.id, 
                req.user.user_id, 
                req.body
            );
            sendSuccess(res, 'Todo updated successfully', todo);
        } catch (error) {
            next(error);
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const result = await todoService.deleteTodo(req.params.id, req.user.user_id);
            sendSuccess(res, 'Todo deleted successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getTodoStats(req, res, next) {
        try {
            const stats = await todoService.getTodoStats(req.user.user_id);
            sendSuccess(res, 'Todo statistics retrieved successfully', stats);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TodoController();
