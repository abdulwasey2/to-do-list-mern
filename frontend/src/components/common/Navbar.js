import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/"><h1>TodoApp</h1></Link>
            <ul>
                {user ? (
                    <>
                        {/* YAHAN CLASSNAME ADD KIYA GAYA HAI */}
                        <li><span className="welcome-text">Welcome, {user.name}</span></li>
                        <li>
                            <button onClick={handleLogout} className="btn">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;