/* style imports */
import '../styles/Login.css';

import React, { useState } from "react";

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // send username and password to server for verification
        // handleLogin should set some state or perform a redirect to the current page on successful login
        handleLogin();
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLoginSubmit}>
                <h1>Login</h1>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

