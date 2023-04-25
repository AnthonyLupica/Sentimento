/* style imports */
import '../styles/Login.css';

import React, { useState } from "react";

export default function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameChange(e) {
        console.log(username);
        setUsername(e.target.value);
    };

    function handlePasswordChange(e) {
        console.log(password);
        setPassword(e.target.value);
    };

    function handleLoginSubmit(e) {
        e.preventDefault();
        if (username !== "" && password !== "") {
            props.handleLogin(username, password);
        }
    };

    // adjust class names for Login styles (super hacky way to style the body differently based on the route)
    document.body.classList.remove("Dashboard--Body");
    document.body.classList.add("Login--Body");

    return (
        <div className="Login--Wrapper">
            <form className="Login--Form" onSubmit={handleLoginSubmit}>
                <h1 className="Login--Greeting">Welcome</h1>
                <input
                    className="Login--Input"
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Email or username"
                    onChange={handleUsernameChange}
                /><br />
                <input
                    className="Login--Input"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                /><br />
                <button className="Login--Submit" type="submit">Login</button>
            </form>
        </div>
    );
}
