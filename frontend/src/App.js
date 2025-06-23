import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthContext } from './context/AuthContext';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;