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
    const [isLoading, setIsLoading] = React.useState(false);
    const [newJournalLoading, setNewJournalLoading] = React.useState({});
    
    // set state with useEffect
    React.useEffect(() => {
        if (isLoading) {
            fetch('http://localhost:5000/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: newJournalLoading.id,
                    title: newJournalLoading.title,
                    text: newJournalLoading.text,
                    dateAndTime: newJournalLoading.dateAndTime
                })
            })
                .then(response => response.json())
                .then(data => {
                    /* FILTER JOURNALS ARRAY AND MODIFY MOOD AND COLOR PROPERTIES */
                    const updatedJournals = journals.map(journal => {
                        // if the journal that was just instantiated
                        if (journal.id === data.id) {
                            return {
                                ...journal,
                                mood: data.mood,
                                color: data.color
                            };
                        } else {
                            return journal;
                        }
                    });

                    console.log(updatedJournals);

                    /* UPDATE STATE */
                    setJournals(updatedJournals);
                })
                .catch(error => {
                    console.log(error);
                });
            setIsLoading(false);
        }

        else {
            setJournals(JournalData);
        }
    }, [newJournalLoading])

    // createJournal
    // pre: title, and text from CreateJournal component (submitted when user clicks the save entry button)
    // post: a new journal entry is created. Responsible for initiating the re-rendering of the updated journal array
    function createJournal(title, text) {
        /* GET DATE AND TIME */
        const dateAndTime = getDateTime();

        /* CONSTRUCT A NEW JOURNAL OBJECT */
        const newJournal = {
            id: nanoid(),
            title: title,
            mood: "loading",
            color: "loading",
            text: text,
            dateAndTime: dateAndTime
        };

        /* UPDATE STATE */
        setJournals(prevJournals => {
            return [
                newJournal,
                ...prevJournals
            ];
        });

        setIsLoading(true);
        setNewJournalLoading(newJournal);
    }

    function getDateTime() {
        // get raw unparsed date and time
        const date = new Date();

        // parse the date into day, month, and year. Format a string into "{month}/{day}/{year}"
        const day = date.getDate();
        const month = date.getMonth() + 1; // +1 for 1-based indexing 
        const year = date.getFullYear();
        const dayMonthYear = `${month.toString()}/${day.toString()}/${year.toString()}`;

        // get the time with toLocaleTimeString()
        const time = date.toLocaleTimeString('en-us');

        // concatenate final string and return 
        return dayMonthYear + ' | ' + time;
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
    function deleteJournal(id) {
        const noteDeleted = journals.filter((journal) => journal.id !== id);
        setJournals(noteDeleted);
    }

    // trim and convert the SearchQuery string to lowercase  
    const preparedSearchQuery = searchQuery.trim().toLowerCase();
    
    return (
        <>
            <Navbar showCreateJournal={showCreateJournal} handleShowCreateJournal={toggleCreateJournal} setSearchQuery={setSearchQuery} />

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

