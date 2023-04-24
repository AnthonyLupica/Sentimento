/*
    JournalContainer.jsx defines a component for making Journals responsive in how they render on the page.
    It is responsible for parsing the given array of journals, and sorting them into styled <div> containers 
*/

/* component imports */
import React from 'react'; 
import Journal from './Journal';
import CreateJournal from './CreateJournal';
import EmotionProperties from '../EmotionProperties'; 

/* style imports */
import '../styles/JournalContainer.css';

export default function JournalContainer(props) {

    // filter the data into two arrays by conditioning on even and odd indexes
    const leftEntries = props.journalData.filter((_entry, index) => index % 2 === 0);
    const rightEntries = props.journalData.filter((_entry, index) => index % 2 !== 0);

    return (
        /* conditionally assign a className based on boolean state prop */
        <div className={`Container${props.showCreateJournal ? '--Blur' : ''}`}>
            
            {/* CreateJournal is conditionally rendered based on the boolean state "showCreateJournal" */}
            {props.showCreateJournal && <div className="Overlay">
                {/* pass in event handlers*/}
                <CreateJournal handleCreateJournal={props.handleCreateJournal} handleShowCreateJournal={props.handleShowCreateJournal}/>
            </div>}

            <div className="JournalContainer">
                {/* Journals for the left vertical */}
                <div className="JournalsLeft">
                    {/* For every element in the array, which is itself an object, render a Journal */}
                    {leftEntries.map((entry) => {

                        // Object.entries(entry) gets us an array of the form [ [key, value] ...]
                        // we then filter this array to include only those key-value pairs where the key is contained within
                        // EmotionProperties
                        const allEmotions = Object.entries(entry)
                            .filter(key => Object.keys(EmotionProperties).includes(key[0]));

                        // sort the key-value pairs in descending order by their values
                        const sortedEmotions = allEmotions.sort((a, b) => b[1] - a[1]);

                        // finally get the top three emotions
                        const topThreeEmotions = sortedEmotions.slice(0, 3);

                        return (
                            <Journal
                                id={entry.id}
                                key={entry.id}
                                title={entry.title}
                                mood={entry.mood}
                                color={entry.color}
                                text={entry.text}
                                dateAndTime={entry.dateAndTime}
                                handleDeleteJournal={props.handleDeleteJournal}
                                topThreeEmotions={topThreeEmotions}
                            />
                        );
                    })}  
                </div>

                {/* Journals for the right vertical */}
                <div className="JournalsRight">
                    {/* For every element in the array, which is itself an object, render a Journal */}
                    {rightEntries.map((entry) => {

                        // Object.entries(entry) gets us an array of the form [ [key, value] ...]
                        // we then filter this array to include only those key-value pairs where the key is contained within
                        // EmotionProperties
                        const allEmotions = Object.entries(entry)
                            .filter(key => Object.keys(EmotionProperties).includes(key[0]));

                        // sort the key-value pairs in descending order by their values
                        const sortedEmotions = allEmotions.sort((a, b) => b[1] - a[1]);

                        // finally get the top three emotions
                        const topThreeEmotions = sortedEmotions.slice(0, 3);
                        
                        return (
                            <Journal
                                id={entry.id}
                                key={entry.id}
                                title={entry.title}
                                mood={entry.mood}
                                color={entry.color}
                                text={entry.text}
                                dateAndTime={entry.dateAndTime}
                                handleDeleteJournal={props.handleDeleteJournal}
                                topThreeEmotions={topThreeEmotions}
                            />
                        );
                    })}  
                </div>
            </div> 
            
        </div>
    );
}
