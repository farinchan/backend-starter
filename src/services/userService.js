const { User } = require('../models');
const { updateProfileValidation } = require('../utils/validation');

class UserService {
    async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    }

    async updateProfile(userId, updateData, file = null) {
        // Validate input data
        const { error } = updateProfileValidation(updateData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if email is being updated and if it already exists
        if (updateData.email && updateData.email !== user.email) {
            const existingUser = await User.findOne({ 
                where: { email: updateData.email } 
            });
            if (existingUser) {
                throw new Error('Email already exists');
            }
        }

        // Update user data
        const updatedData = { ...updateData };
        if (file) {
            updatedData.picture = file.filename;
        }

        await user.update(updatedData);
        
        // Return user without password
        const { password, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    async deleteAccount(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        await user.destroy();
        return { message: 'Account deleted successfully' };
    }

    async getAllUsers(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        
        const { count, rows } = await User.findAndCountAll({
            attributes: { exclude: ['password'] },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        return {
            users: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                pages: Math.ceil(count / limit)
            }
        };
    }
}

module.exports = new UserService();
