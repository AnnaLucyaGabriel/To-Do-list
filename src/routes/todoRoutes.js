const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const todoController = require('../controllers/todoController');

router.post('/add', authMiddleware, todoController.addTodo);
router.get('/toggle/:id', authMiddleware, todoController.toggleTodo);
router.get('/delete/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
