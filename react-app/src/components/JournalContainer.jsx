/*
    JournalContainer.jsx defines a component for making Journals responsive in how they render on the page.
    It is responsible for parsing the given array of journals, and sorting them into styled <div> containers 
*/

/* component imports */
import React from 'react'; 
import Journal from './Journal';
import CreateJournal from './CreateJournal';

/* style imports */
import '../styles/JournalContainer.css';

export default function JournalContainer(props) {

    // filter the data into two arrays by conditioning on even and odd indexes
    const leftEntries = props.journalData.filter((_entry, index) => index % 2 === 0);
    const rightEntries = props.journalData.filter((_entry, index) => index % 2 !== 0);

    return (
        <div className="JournalContainer">

            {/* Journals for the left vertical */}
            <div className="JournalsLeft">
                
                {/* For every element in the array, which is itself an object, render a Journal */}
                {leftEntries.map((entry) => (
                    <Journal
                        id={entry.id}
                        title={entry.title}
                        mood={entry.mood}
                        color={entry.color}
                        text={entry.text}
                        dateAndTime={entry.dateAndTime}
                    />
                ))}  

            </div>

            {/* Journals for the right vertical */}
            <div className="JournalsRight">

                {/* For every element in the array, which is itself an object, render a Journal */}
                {rightEntries.map((entry) => (
                    <Journal
                        id={entry.id}
                        title={entry.title}
                        mood={entry.mood}
                        color={entry.color}
                        text={entry.text}
                        dateAndTime={entry.dateAndTime}
                    />
                ))}  

                {/* CreateJournal is conditionally rendered based on the boolean state "showCreateJournal" */}
                {/* pass in the event handler for a new journal entry */}
                {props.showCreateJournal && <CreateJournal handleCreateJournal={props.handleCreateJournal} handleShowCreateJournal={props.handleShowCreateJournal}/>}

            </div>

        </div> 
    );
}


          