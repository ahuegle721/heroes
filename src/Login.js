import React, { useState } from 'react'
import axios from 'axios'
import api from './api'

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: 'info@andreashuegle.de',
        password: 'hugohub'
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/auth/login', credentials);
            const { token } = response.data;

            // Store the tokens in localStorage or secure cookie for later use
            localStorage.setItem('token', token);

            // Redirect or perform other actions upon successful login
        } catch (error) {
            // Handle login error
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login
