const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Yeh 'User' model se link hai
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: false // Description optional hai
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // Sirf in do values ki ijazat hai
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: false // Due date optional hai
    }
}, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;