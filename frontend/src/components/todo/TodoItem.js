import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';

const TodoItem = ({ todo }) => {
    const { updateTodo, deleteTodo } = useContext(TodoContext);
    
    // NEW FEATURE: State for editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleToggleStatus = () => {
        updateTodo(todo._id, { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' });
    };

    const handleUpdateTitle = () => {
        if (newTitle.trim() === '') return;
        updateTodo(todo._id, { ...todo, title: newTitle });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setNewTitle(todo.title);
        setIsEditing(false);
    };

    return (
        <li className={`todo-item ${todo.status}`}>
            {isEditing ? (
                // NEW: View when in editing mode
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="edit-input"
                    />
                    <div className="todo-actions">
                        <button onClick={handleUpdateTitle} className="btn btn-primary">Save</button>
                        <button onClick={handleCancelEdit} className="btn btn-secondary">Cancel</button>
                    </div>
                </>
            ) : (
                // Default view
                <>
                    <div className="todo-content">
                        <span onClick={handleToggleStatus} className="todo-title">
                            {todo.title}
                        </span>
                        {/* NEW: Display due date if it exists */}
                        {todo.dueDate && (
                            <span className="due-date">
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <div className="todo-actions">
                        <button onClick={() => setIsEditing(true)} className="btn btn-secondary">Edit</button>
                        <button onClick={() => deleteTodo(todo._id)} className="btn btn-danger">Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;