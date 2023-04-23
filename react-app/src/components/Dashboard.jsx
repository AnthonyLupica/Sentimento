/*
    Dashboard.jsx is the main page of the application
*/

/* component imports */
import React from 'react';
import { nanoid } from 'nanoid'; // nanoid is a library that generates random unique ids
import JournalContainer from './JournalContainer';
import Navbar from './Navbar';

/* style imports */
import '../styles/Dashboard.css'

export default function Dashboard() {
    // define state for this component
    const [journals, setJournals] = React.useState([]);
    const [showCreateJournal, setShowCreateJournal] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [newJournalRef, setnewJournalRef] = React.useState({});

    React.useEffect(() => {
        // initialize with journals on first mount 
        if (!isLoading) {
            journalsInitFetch();
        }

        // this block handles the fetch to create a new journal
        else {
            fetch('http://localhost:5000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: newJournalRef.id,
                    title: newJournalRef.title,
                    text: newJournalRef.text,
                    dateAndTime: newJournalRef.dateAndTime
                })
            })
                .then(response => response.json())
                .then(data => {
                    // map over journals and modify new journal with mood and color response 
                    const updatedJournals = journals.map(journal => {
                        if (journal.id === data.id) {
                            return {
                                ...journal,
                                mood: data.mood,
                                color: data.color,
                                admiration: data.admiration,
                                amusement: data.amusement,
                                anger: data.anger,
                                annoyance: data.annoyance,
                                approval: data.approval,
                                caring: data.caring,
                                confusion: data.confusion,
                                curiosity: data.curiosity,
                                desire: data.desire,
                                disappointment: data.disappointment,
                                disapproval: data.disapproval,
                                disgust: data.disgust,
                                embarrassment: data.embarrassment,
                                excitement: data.excitement,
                                fear: data.fear,
                                gratitude: data.gratitude,
                                grief: data.grief,
                                joy: data.joy,
                                love: data.love,
                                nervousness: data.nervousness,
                                neutral: data.neutral,
                                optimism: data.optimism,
                                pride: data.pride,
                                realization: data.realization,
                                relief: data.relief,
                                remorse: data.remorse,
                                sadness: data.sadness,
                                surprise: data.surprise
                            };
                        } else {
                            return journal;
                        }
                    });

                    /* UPDATE STATE */
                    setJournals(updatedJournals);
                })
                .catch(error => {
                    console.log(error);
                });

            setIsLoading(false);
        }
    }, [newJournalRef])

    function journalsInitFetch() {
        fetch("http://localhost:5000/myNotes")
            .then(res => res.json())
            .then(data => {
                // if the data is truthy, set to state
                // and try again otherwise
                if (data) {
                    setJournals(data);
                } else {
                    setTimeout(() => {
                        journalsInitFetch();
                    }, 3000);
                }
            })
            // if server error, try again 
            .catch(error => {
                console.log(error);
                setTimeout(() => {
                    journalsInitFetch();
                }, 3000); 
            });
    }

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

        // useEffect is triggered by newJournalRef changing state
        // the path for performing a post request will be taken because isLoading is set to true here
        setIsLoading(true);
        setnewJournalRef(newJournal);
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

