const { sendSuccess } = require('../utils');

class ExampleController {
    async test(req, res, next) {
        try {
            const data = {
                message: 'API is working correctly',
                user: req.user ? req.user : null,
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development'
            };
            
            sendSuccess(res, 'Test endpoint successful', data);
        } catch (error) {
            next(error);
        }
    }

    async health(req, res, next) {
        try {
            const data = {
                status: 'healthy',
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                version: process.env.npm_package_version || '1.0.0'
            };
            
            sendSuccess(res, 'API health check successful', data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ExampleController();
