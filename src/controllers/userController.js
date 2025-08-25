const { userService } = require('../services');
const { sendSuccess, sendError } = require('../utils');

class UserController {
    async getProfile(req, res, next) {
        try {
            const user = await userService.getProfile(req.user.user_id);
            sendSuccess(res, 'Profile retrieved successfully', user);
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateProfile(
                req.user.user_id, 
                req.body, 
                req.file
            );
            sendSuccess(res, 'Profile updated successfully', user);
        } catch (error) {
            next(error);
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const result = await userService.deleteAccount(req.user.user_id);
            sendSuccess(res, 'Account deleted successfully', result);
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await userService.getAllUsers(page, limit);
            sendSuccess(res, 'Users retrieved successfully', result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
