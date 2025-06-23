const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Routes ko import karein
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');

// Express application ko initialize karein
const app = express();

// Database se connect karein
connectDB();

// Middleware ka istemal
app.use(cors());
app.use(express.json()); // Request body ko JSON format mein parhne ke liye

// API Routes
// Jab bhi koi request '/api/users' par aye, use 'userRoutes' handle karega
app.use('/api/users', userRoutes);
// Jab bhi koi request '/api/todos' par aye, use 'todoRoutes' handle karega
app.use('/api/todos', todoRoutes);

// Health check route (Debugging ke liye mufeed)
app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        server: 'Running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the To-Do List App API!'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});