const User = require('./User');
const Todo = require('./Todo');

// Define associations
User.hasMany(Todo, {
    foreignKey: 'userId',
    as: 'todos'
});

Todo.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    User,
    Todo
};
