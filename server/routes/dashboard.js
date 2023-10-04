const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const pool = require('../db');

// Get all todos and name
router.get('/', authorize, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1',
      // Alternative shortened query
      // 'SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1',
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create new todo
router.post('/todos', authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update todo
router.put('/todos/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("Changes made to other users' todos not allowed");
    }

    res.json('Updated todo');
  } catch (err) {
    console.error(err.message);
  }
});

// Delete todo
router.delete('/todos/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("Changes made to other users' todos not allowed");
    }

    res.json('Deleted todo');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
