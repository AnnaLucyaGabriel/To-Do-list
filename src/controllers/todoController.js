const User = require('../models/userModel');

exports.addTodo = async (req, res) => {
    await User.findByIdAndUpdate(req.session.userId, {
        $push: { todos: { title: req.body.title } }
    });
    res.redirect('/dashboard');
};

exports.toggleTodo = async (req, res) => {
    const user = await User.findById(req.session.userId);
    const todo = user.todos.id(req.params.id);
    todo.completed = !todo.completed;
    await user.save();
    res.redirect('/dashboard');
};

exports.deleteTodo = async (req, res) => {
    await User.findByIdAndUpdate(req.session.userId, {
        $pull: { todos: { _id: req.params.id } }
    });
    res.redirect('/dashboard');
};
