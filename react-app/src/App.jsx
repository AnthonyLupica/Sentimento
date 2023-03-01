/*
 * app.jsx is the main component of the application, which serves as a container for other components. 
 * Responsible for the logic of the overall structure and behavior of the application, 
 * and will include routing and state management
 */

import React from "react";
import NavBar from "./components/NavBar";
import JournalEntry from "./components/JournalEntry";
import './styles/JournalEntry.css';

export default function App() {

    console.log("App component rendered");
    return (
        <>
            <NavBar />

            <div className="JournalContainerContainer">

                {/* Journals for the left vertical */}
                <div className="JournalContainerLeft">
                    <JournalEntry
                        mood="Fearful"
                        title="Progress on Sentimento"
                        entry="Progress is happening, but i'm hoping we'll have enough to get everything working in time"
                        time="7:00pm" date="1/31/23"
                    />
                </div>

                {/* Journals for the right vertical */}
                <div className="JournalContainerRight">
                    <JournalEntry
                        mood="Joyful"
                        title="Long Entry"
                        entry="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        time="8:00pm" date="2/24/23"
                    />
                </div>
            </div>
        </>
    );
};

