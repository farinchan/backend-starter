const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required().messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 100 characters',
            'any.required': 'Name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        })
    });
    
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email',
            'any.required': 'Email is required'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required'
        })
    });
    
    return schema.validate(data);
};

const todoValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required().messages({
            'string.min': 'Title must be at least 2 characters long',
            'string.max': 'Title cannot exceed 255 characters',
            'any.required': 'Title is required'
        }),
        description: Joi.string().min(6).max(1000).required().messages({
            'string.min': 'Description must be at least 6 characters long',
            'string.max': 'Description cannot exceed 1000 characters',
            'any.required': 'Description is required'
        }),
        deadline: Joi.date().min('now').required().messages({
            'date.min': 'Deadline must be in the future',
            'any.required': 'Deadline is required'
        }),
        status: Joi.string().valid('pending', 'in_progress', 'completed').optional()
    });
    
    return schema.validate(data);
};

const updateTodoValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).optional().messages({
            'string.min': 'Title must be at least 2 characters long',
            'string.max': 'Title cannot exceed 255 characters'
        }),
        description: Joi.string().min(6).max(1000).optional().messages({
            'string.min': 'Description must be at least 6 characters long',
            'string.max': 'Description cannot exceed 1000 characters'
        }),
        deadline: Joi.date().min('now').optional().messages({
            'date.min': 'Deadline must be in the future'
        }),
        status: Joi.string().valid('pending', 'in_progress', 'completed').optional()
    });
    
    return schema.validate(data);
};

const updateProfileValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional().messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 100 characters'
        }),
        email: Joi.string().email().optional().messages({
            'string.email': 'Please provide a valid email'
        }),
        phone: Joi.string().optional()
    });
    
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
    todoValidation,
    updateTodoValidation,
    updateProfileValidation
};
