const express = require('express');
const session = require('express-session');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/userModel');
const app = express();
connectDB();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'todo-secret',
    resave: false,
    saveUninitialized: false
}));
app.use('/', authRoutes);
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/dashboard', authMiddleware, async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.render('dashboard', { user });
});
app.use('/todos', todoRoutes);

module.exports = app;
