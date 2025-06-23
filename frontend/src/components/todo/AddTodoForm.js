import React, { useState, useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

const AddTodoForm = () => {
    const [title, setTitle] = useState('');
    // NEW FEATURE: State for due date
    const [dueDate, setDueDate] = useState('');
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            alert('Please enter a title');
            return;
        }
        try {
            // NEW FEATURE: Pass dueDate to addTodo
            await addTodo({ title, dueDate: dueDate || null });
            setTitle('');
            setDueDate('');
        } catch (error) {
            alert('Failed to add todo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new to-do..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* NEW FEATURE: Due date input field */}
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;