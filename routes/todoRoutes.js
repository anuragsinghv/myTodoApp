const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Route: GET /api/todos
router.get('/', todoController.getTodos);

// Route: POST /api/todos
router.post('/', todoController.addTodo);

// Route: PUT /api/todos/:id
router.put('/:id', todoController.toggleTodo);

// Route: DELETE /api/todos/:id
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
