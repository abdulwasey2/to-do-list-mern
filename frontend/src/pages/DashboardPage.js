import React, { useEffect, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import AddTodoForm from '../components/todo/AddTodoForm';
import TodoList from '../components/todo/TodoList';
import FilterControls from '../components/todo/FilterControls'; // NEW: Import FilterControls

const DashboardPage = () => {
    const { fetchTodos, loading } = useContext(TodoContext);

    useEffect(() => {
        fetchTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>My To-Do List</h2>
            <AddTodoForm />
            <FilterControls /> {/* NEW: Add FilterControls here */}
            {loading ? <p>Loading todos...</p> : <TodoList />}
        </div>
    );
};

export default DashboardPage;