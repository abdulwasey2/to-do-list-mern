import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
    // UPDATED: Use filteredTodos instead of todos
    const { filteredTodos } = useContext(TodoContext);

    if (filteredTodos.length === 0) {
        return <p>No todos match the current filter. Add one!</p>;
    }

    return (
        <ul className="todo-list">
            {filteredTodos.map(todo => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;