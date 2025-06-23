import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

const FilterControls = () => {
    const { filter, setFilter } = useContext(TodoContext);

    return (
        <div className="filter-controls">
            <button
                className={`btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
            >
                All
            </button>
            <button
                className={`btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
            >
                Pending
            </button>
            <button
                className={`btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
            >
                Completed
            </button>
        </div>
    );
};

export default FilterControls;