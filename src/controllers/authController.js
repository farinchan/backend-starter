const { authService } = require('../services');
const { sendSuccess, sendError, sendCreated } = require('../utils');

class AuthController {
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body);
            sendCreated(res, 'User registered successfully', user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            sendSuccess(res, 'Login successful', result);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const result = await authService.refreshToken(req.user.user_id);
            sendSuccess(res, 'Token refreshed successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            // In a real-world scenario, you might want to blacklist the token
            sendSuccess(res, 'Logout successful');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
