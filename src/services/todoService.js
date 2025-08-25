const { Todo, User } = require('../models');
const { todoValidation, updateTodoValidation } = require('../utils/validation');

class TodoService {
    async getAllTodos(userId, page = 1, limit = 10, status = null) {
        const offset = (page - 1) * limit;
        const whereClause = { userId };
        
        if (status) {
            whereClause.status = status;
        }

        const { count, rows } = await Todo.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        return {
            todos: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                pages: Math.ceil(count / limit)
            }
        };
    }

    async createTodo(userId, todoData) {
        // Validate input data
        const { error } = todoValidation(todoData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const todo = await Todo.create({
            ...todoData,
            userId
        });

        // Return todo with user data
        const todoWithUser = await Todo.findByPk(todo.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        return todoWithUser;
    }

    async getTodoById(todoId, userId) {
        const todo = await Todo.findOne({
            where: { 
                id: todoId,
                userId 
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!todo) {
            throw new Error('Todo not found');
        }

        return todo;
    }

    async updateTodo(todoId, userId, updateData) {
        // Validate input data
        const { error } = updateTodoValidation(updateData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const todo = await Todo.findOne({
            where: { 
                id: todoId,
                userId 
            }
        });

        if (!todo) {
            throw new Error('Todo not found');
        }

        await todo.update(updateData);

        // Return updated todo with user data
        const updatedTodo = await Todo.findByPk(todo.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        return updatedTodo;
    }

    async deleteTodo(todoId, userId) {
        const todo = await Todo.findOne({
            where: { 
                id: todoId,
                userId 
            }
        });

        if (!todo) {
            throw new Error('Todo not found');
        }

        await todo.destroy();
        return { message: 'Todo deleted successfully' };
    }

    async getTodoStats(userId) {
        const stats = await Todo.findAll({
            where: { userId },
            attributes: [
                'status',
                [Todo.sequelize.fn('COUNT', Todo.sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        const total = await Todo.count({ where: { userId } });

        return {
            total,
            stats: stats.reduce((acc, stat) => {
                acc[stat.status] = parseInt(stat.count);
                return acc;
            }, {})
        };
    }
}

module.exports = new TodoService();
