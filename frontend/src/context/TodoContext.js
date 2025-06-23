import React, { createContext, useState, useContext, useMemo } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    // NEW FEATURE: State for filtering
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

    const fetchTodos = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await api.get('/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Failed to fetch todos', error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todoData) => {
        try {
            const response = await api.post('/todos', todoData);
            setTodos([response.data, ...todos]);
        } catch (error) {
            console.error('Failed to add todo', error);
            throw error; // Re-throw error to handle in component
        }
    };

    const updateTodo = async (id, updatedData) => {
        try {
            const response = await api.put(`/todos/${id}`, updatedData);
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        } catch (error) {
            console.error('Failed to update todo', error);
            throw error;
        }
    };

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Failed to delete todo', error);
            throw error;
        }
    };

    // NEW FEATURE: Derived state for filtered todos
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.status === 'completed');
            case 'pending':
                return todos.filter(todo => todo.status === 'pending');
            default:
                return todos;
        }
    }, [todos, filter]);

    const value = {
        todos,
        loading,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        // NEW: Exposing filter state and updater
        filter,
        setFilter,
        filteredTodos,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};