const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { registerValidation, loginValidation } = require('../utils/validation');

class AuthService {
    async register(userData) {
        // Validate input data
        const { error } = registerValidation(userData);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { name, email, password } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    async login(credentials) {
        // Validate input data
        const { error } = loginValidation(credentials);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password } = credentials;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toJSON();

        return {
            token,
            user: userWithoutPassword
        };
    }

    async refreshToken(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        return { token };
    }
}

module.exports = new AuthService();
