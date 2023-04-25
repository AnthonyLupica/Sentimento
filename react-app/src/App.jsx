/*
    app.jsx is the main component of the application, which serves as a container for all other components
*/

/* component imports */
import React from 'react';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

export default function App() {

    const history = useHistory();

    function handleLogin(username, password) {
        // make a call to the server

        // if successful
        history.push('/dashboard');
    }

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <Route path="/login">
                    <Login handleLogin={handleLogin} />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
        </>
    );
}