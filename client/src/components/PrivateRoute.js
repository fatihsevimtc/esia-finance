import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShouldNavigate(true);
        }
    }, [isAuthenticated]);

    if (shouldNavigate) {
        navigate('/login');
        return null;
    }

    return isAuthenticated ? children : null;
};

export default PrivateRoute;