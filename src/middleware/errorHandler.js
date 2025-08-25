const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let error = {
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    // Sequelize validation error
    if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(error => error.message);
        error.message = messages.join(', ');
        return res.status(400).json(error);
    }

    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
        error.message = 'Resource already exists';
        return res.status(409).json(error);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error.message = 'Invalid token';
        return res.status(401).json(error);
    }

    if (err.name === 'TokenExpiredError') {
        error.message = 'Token expired';
        return res.status(401).json(error);
    }

    // Cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        error.message = 'Resource not found';
        return res.status(404).json(error);
    }

    res.status(err.statusCode || 500).json(error);
};

const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
};

module.exports = {
    errorHandler,
    notFound
};
