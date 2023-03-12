/*
    app.jsx is the main component of the application, which serves as a container for all other components
*/

/* component imports */
import React from 'react';
import { nanoid } from 'nanoid'; // nanoid is a library that generates random unique ids
import JournalContainer from './components/JournalContainer';
import Navbar from './components/Navbar';
import JournalData from './JournalData';

/* style imports */
import './styles/App.css'

export default function App() {

    // define state for this component
    const [journals, setJournals] = React.useState([]);
    const [showCreateJournal, setShowCreateJournal] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    // set state with useEffect
    React.useEffect(() => {
        //fetch("http://localhost:5000/flask/hello")
        //    .then(res => res.json())
        //    .then(data => setJournals(data))

        // for now we use hardcoded JournalData.jsx
        setJournals(JournalData);
    }, [])

    // createJournal
    // pre: title, and text from CreateJournal component (submitted when user clicks the save entry button)
    // post: a new journal entry is created. Responsible for initiating the re-rendering of the updated journal array
    // @TODO figure out how to have this write to the database, which itiates an api call to fetch teh journals
    function createJournal(title, text) {
        /*  A journal has the following fields 
            id:
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
            mood: "todo",   
            color: "green", 
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

    // toggleCreateJournal
    // pre: the user initiates/cancels the creation of a journal, or saves a new journal
    // post: state is toggled to show/hide the CreateJournal component
    function toggleCreateJournal() {
        setShowCreateJournal(prevShowCreateJournal => !prevShowCreateJournal);
    }

    // deleteJournal
    // pre: id of the calling Journal 
    // post: all Journals except the Journal for which the id property is a match are copied into a new array for state
    // @TODO figure out how to have this write to the database, which initiates an api call to fetch the journals
    function deleteJournal(id) {
        const noteDeleted = journals.filter((journal) => journal.id !== id);
        setJournals(noteDeleted);
    }

    // trim and convert the SearchQuery string to lowercase  
    const preparedSearchQuery = searchQuery.trim().toLowerCase();
    
    return (
        <>
            {/*   <Navbar />
                  1) showCreateJournal - state as prop to determine if a create or cancel button renders
                  2) handleShowCreatejournal - handler for toggling showCreateJournal on button click
                  3) setSearchQuery - state setter to be drilled down to the SearchJournal component
             */}
            <Navbar showCreateJournal={showCreateJournal} handleShowCreateJournal={toggleCreateJournal} setSearchQuery={setSearchQuery} />

            {/*   <JournalContainer />
                  1) journalData - state as prop for filtering journal entries into left or right side containers
                  2) showCreateJournal - state as prop to conditionally render a CreateJournal component
                  3) handleShowCreateJournal - handler to be drilled into CreateJournal
                  4) handleCreateJournal - handler to be drilled into CreateJournal
                  5) handleDeleteJournal - handler to be drilled into Journal
             */}
            <JournalContainer 
                journalData={journals.filter((journal) => journal.mood.toLowerCase().includes(preparedSearchQuery))} 
                showCreateJournal={showCreateJournal} 
                handleCreateJournal={createJournal} 
                handleShowCreateJournal={toggleCreateJournal}
                handleDeleteJournal={deleteJournal}
            /> 
        </>
    );
}

