import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;