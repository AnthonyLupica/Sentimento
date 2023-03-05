/*
    app.jsx is the main component of the application, which serves as a container for all other components
*/

/* component imports */
import { nanoid } from 'nanoid';
import React from 'react';
import JournalContainer from './components/JournalContainer';
import JournalData from './JournalData';

/* style imports */
import './styles/App.css'

export default function App() {

    // state for the journal entries array lives here at the top-most level
    const [journals, setJournals] = React.useState(JournalData);

    // handler that will be passed down to the CreateJournal component, giving it the ability to affect state in App
    // params: title, and text state submitted when user clicks the save entry button 
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
        console.log(dayMonthYear);

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
    

    return (
        <div className="Container">

            {/* pass in journal data state as a prop and the event handler for a new journal */}
            <JournalContainer journalData={journals} handleCreateJournal={handleCreateJournal}/> 

        </div>
    );
}

