const Todo = require('../models/todoModel');

// GET /api/todos
exports.getTodos = (req, res) => {
  res.json(Todo.getTodos());
};

// POST /api/todos
exports.addTodo = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = Todo.addTodo(text);
  res.status(201).json(newTodo);
};

// PUT /api/todos/:id
exports.toggleTodo = (req, res) => {
  const { id } = req.params;
  const updated = Todo.toggleTodo(id);
  if (!updated) return res.status(404).json({ error: "Todo not found" });

  res.json(updated);
};

// DELETE /api/todos/:id
exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const success = Todo.deleteTodo(id);
  if (!success) return res.status(404).json({ error: "Todo not found" });

  res.json({ message: "Todo deleted" });
};
