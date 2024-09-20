
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || username.trim() === '') {
            alert('Please fill in both fields with valid values.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert(response.data.msg || 'User registered successfully!');
        } catch (error) {
            console.error('Registration error:', error);  // Log error to console
            const errorMsg = error.response ? error.response.data.msg : error.message;
            alert('Registration failed: ' + errorMsg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
