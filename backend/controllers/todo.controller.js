const asyncHandler = require('express-async-handler');
const Todo = require('../models/todo.model');

// @desc    User ke tamam todos hasil karein
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    // Sirf us user ke todos dhoondein jo logged-in hai (req.user.id se)
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
});

// @desc    Naya todo banayein
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a title');
    }

    const todo = await Todo.create({
        title,
        description,
        dueDate,
        user: req.user.id, // Todo ko logged-in user se link karein
    });

    res.status(201).json(todo);
});

// @desc    Ek todo ID se hasil karein
// @route   GET /api/todos/:id
// @access  Private
const getTodoById = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }

    // Security Check: Yakeeni banayein ke todo usi user ka hai jo request kar raha hai
    if (todo.user.toString() !== req.user.id) {
        res.status(401); // Unauthorized
        throw new Error('User not authorized to view this todo');
    }

    res.json(todo);
});

// @desc    Ek todo ko update karein
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }

    // Security Check
    if (todo.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to update this todo');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Response mein updated document bhejein
    });

    res.json(updatedTodo);
});

// @desc    Ek todo ko delete karein
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }

    // Security Check
    if (todo.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized to delete this todo');
    }

    await todo.deleteOne();

    res.json({ id: req.params.id, message: 'Todo removed successfully' });
});

module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
};