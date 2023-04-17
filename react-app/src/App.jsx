import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login.jsx";
/* component imports */
import React from "react";
import { nanoid } from "nanoid"; // nanoid is a library that generates random unique ids
import JournalContainer from "./components/JournalContainer";
import Navbar from "./components/Navbar";
import JournalData from "./JournalData";

/* style imports */
import "./styles/App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <div className="wrapper">
            <h1>Login Page</h1>
            <Login handleLogin={handleLogin} />
          </div>
        </Route>
        <Route path="/journal">
          {isLoggedIn ? (
            <>
              <Navbar />
              <JournalContainer
                journalData={JournalData}
                handleCreateJournal={() => {}}
                handleShowCreateJournal={() => {}}
                handleDeleteJournal={() => {}}
              />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
