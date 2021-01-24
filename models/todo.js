const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('todos', {
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    iscomplete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isdelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

Todo.sync().then(() => console.log("`todos` table created"))

module.exports = Todo;