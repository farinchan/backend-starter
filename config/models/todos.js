const { DataTypes } = require('sequelize');
const db = require("../database/mysql");

const Todo = db.define('todos', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    // Other model options go here
    freezeTableName: true,
    timestamps: false
});

// console.log(User === db.models.User); // true

module.exports = Todo
