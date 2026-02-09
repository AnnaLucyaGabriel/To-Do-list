const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
});

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    todos: [todoSchema]
});

module.exports = mongoose.model('User', userSchema);
