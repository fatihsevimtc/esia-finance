import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put('https://esiafinance.azurewebsites.net/api/user', { username, password });
            toast.success('Profile updated successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile, please try again with valid inputs.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <ToastContainer />
            <h2 className="mt-5 mb-3">Profile</h2>
            <button onClick={handleBack} className="btn btn-secondary mb-3">Back</button>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
            {loading && <p className="mt-3">Updating profile...</p>}
        </div>
    );
};

export default Profile;