import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
    const [cronTime, setCronTime] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleCronTimeChange = (event) => {
        setCronTime(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://asiafinanse.azurewebsites.net/api/settings', { cronTime, email });
            toast.success('Settings saved successfully');
            navigate('/dashboard');
        } catch (error) {
          
            toast.error('Error saving settings, please try again with valid inputs.');
        }
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Settings</h2>
            <Button variant="secondary" onClick={handleBack} className="mb-4">
                Back
            </Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="cronTime">
                    <Form.Label>Cron Task Time</Form.Label>
                    <Form.Control type="text" placeholder="Enter cron time" value={cronTime} onChange={handleCronTimeChange} />
                    <Form.Text className="text-muted">
                        Please enter the cron time in the correct format.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                    <Form.Text className="text-muted">
                        We'll send the dashboard data to this email after the sync.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default Settings;