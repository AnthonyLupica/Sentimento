/*
 * app.js is the main component of the application, which serves as a container for other components. 
 * Responsible for the logic of the overall structure and behavior of the application, 
 * and will include routing and state management
 */

import React from "react";
import NavBar from "./components/NavBar";
import JournalEntry from "./components/JournalEntry";
import './JournalEntry.css';

export default function App() {

    return (
        <div className="container">
            <NavBar />

            <div className="JournalContainer">
                <JournalEntry mood="Joyful" title="Notes on my Day" entry="It was a great day at the amusement park!" time="6:00pm" date="1/31/23" />
                <JournalEntry mood="Disgusted" title="What a Prick" entry="That guy in the subway stole my dog. what a disgusting man" time="2:30pm" date="1/31/23" />
                <JournalEntry mood="Fearful" title="Not sure what comes next" entry="Every day I stare further into the abyss. What's it all mean?" time="2:00am" date="1/31/23" />
                <JournalEntry mood="Angry" title="How could they do this to me" entry="No way! there's no way I can let them kick me out of the gang!" time="7:00pm" date="1/31/23" />
                <JournalEntry mood="Default" title="ravioli drop" entry="I dropped all my ravioli!" time="7:00pm" date="February 15 2023" />
            </div>
        </div>
    );
};


