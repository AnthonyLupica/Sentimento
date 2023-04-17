import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
/* component imports */
import React from "react";
import JournalContainer from "./components/JournalContainer";
import Navbar from "./components/Navbar";
import JournalData from "./JournalData";

/* style imports */
import "./styles/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      //TODO
      //Extract the below into its own component
      <>
        <div className="wrapper">
          <h1>Login Page</h1>
          <Login handleLogin={() => {}} />
        </div>
      </>
    ),
  },
  {
    path: "/journal",
    element: (
      <>
        <Navbar />
        <JournalContainer
          journalData={JournalData}
          //TODO
          // None of the below should be props. All of these should live inside the JournalContainer component or deeper
          handleCreateJournal={() => {}}
          handleShowCreateJournal={() => {}}
          handleDeleteJournal={() => {}}
        />
      </>
    ),
  },
]);

export default function App() {
  //TODO
  // make a context to store user auth. USE CONTEXT NOT STATE
  // https://stackoverflow.com/questions/62366578/how-to-use-context-with-hooks-for-authentication
  return <RouterProvider router={router}></RouterProvider>;
}
