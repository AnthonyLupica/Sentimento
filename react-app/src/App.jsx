/*
    app.jsx is the main component of the application, which serves as a container for all other components
*/

/* component imports */
import { nanoid } from 'nanoid'; // nanoid is a library that generates random unique ids
import React from 'react';
import JournalContainer from './components/JournalContainer';
import Navbar from './components/Navbar';
import JournalData from './JournalData';

/* style imports */
import './styles/App.css'

export default function App() {
    /* STATE */

    // state for the journal entries array lives here at the top-most level
    const [journals, setJournals] = React.useState(JournalData);

    // state for determining if a CreateJournal component should render
    const [showCreateJournal, setShowCreateJournal] = React.useState(false);

    // handler that will be passed down to the CreateJournal component, giving it the ability to affect state in App
    // params: title, and text from CreateJournal component state (submitted when user clicks the save entry button)
    function handleCreateJournal(title, text) {
        /*  A journal has the following fields 
            id: nanoid(),
            title: 
            mood: 
            color: 
            text: 
            dateAndTime: 
        */

        /* GET DATE AND TIME */

        // get raw unparsed date and time
        const date = new Date();

        // parse the date into day, month, and year. Format a string into "{month}/{day}/{year}"
        const day = date.getDate();
        const month = date.getMonth() + 1; // +1 for 1-based indexing 
        const year = date.getFullYear();
        const dayMonthYear = `${month.toString()}/${day.toString()}/${year.toString()}`;

        // get the time with toLocaleTimeString()
        const time = date.toLocaleTimeString('en-us');

        // concatenate final string
        const dateAndTime = dayMonthYear + ' | ' + time;

        /* CONSTRUCT A NEW JOURNAL OBJECT */
        const newJournal = {
            id: nanoid(),
            title: title,
            mood: "todo",   // TODO: get from backend
            color: "green", // TODO: get from backend
            text: text,
            dateAndTime: dateAndTime
        };

        /* UPDATE STATE */
        setJournals(prevJournals => {
            return [
                newJournal,
                ...prevJournals
            ];
        })
    }

    function handleShowCreateJournal() {
        setShowCreateJournal(prevShowCreateJournal => !prevShowCreateJournal)
    }
    
    return (
        <>
            <Navbar showCreateJournal={showCreateJournal} handleShowCreateJournal={handleShowCreateJournal}/>

            {/* pass in journal data state, and showCreateJournal as props, and the event handler for a new journal entry */}
            <JournalContainer journalData={journals} showCreateJournal={showCreateJournal} handleCreateJournal={handleCreateJournal} handleShowCreateJournal={handleShowCreateJournal}/> 
        </>
    );
}

