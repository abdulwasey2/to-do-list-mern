const express = require('express');
const router = express.Router();
const {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
} = require('../controllers/todo.controller');

// Authentication middleware ko import karein
const authMiddleware = require('../middleware/auth.middleware');

// In tamam routes ko protect karne ke liye middleware ka istemal
// Iska matlab hai ke user ko in routes ko access karne ke liye logged-in hona zaroori hai
router.use(authMiddleware);

// Routes for Todos
router.route('/')
    .get(getTodos)      // GET /api/todos - Sabhi todos hasil karein
    .post(createTodo);  // POST /api/todos - Naya todo banayein

router.route('/:id')
    .get(getTodoById)   // GET /api/todos/:id - Ek todo ID se hasil karein
    .put(updateTodo)    // PUT /api/todos/:id - Ek todo ko update karein
    .delete(deleteTodo);// DELETE /api/todos/:id - Ek todo ko delete karein

module.exports = router;