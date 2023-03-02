/*
 * app.jsx is the main component of the application, which serves as a container for other components. 
 * Responsible for the logic of the overall structure and behavior of the application, 
 * and will include routing and state management
 */

import React from "react";
import NavBar from "./components/NavBar";
import JournalEntry from "./components/JournalEntry";
import DummyData from "./JournalData";

export default function App() {

    // existing journal entry data in state
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        // Fetch data from dummy API
        console.log("Fetching data from API...");

        setData(DummyData);
    }, []);

    // initialize two arrays by copying elements into them, conditional on even or odd indexes
    const leftEntries = data.filter((_entry, index) => index % 2 === 0);
    const rightEntries = data.filter((_entry, index) => index % 2 !== 0);

    return (
        <>
            <NavBar />

            <div className="JournalContainerContainer">

                {/* Journals for the left vertical */}
                <div className="JournalContainerLeft">

                    {/* For every element in the array, which is itself an object, render a JournalEntry */}
                    {leftEntries.map((entry) => (
                        <JournalEntry
                            title={entry.title}
                            entry={entry.entry}
                            key={entry.id}
                            mood={entry.mood}
                            color={entry.color}
                            date={entry.date}
                            time={entry.time}
                        />
                    ))}  
                </div>

                {/* Journals for the right vertical */}
                <div className="JournalContainerRight">

                    {/* For every element in the array, which is itself an object, render a JournalEntry */}
                    {rightEntries.map((entry) => (
                        <JournalEntry
                            title={entry.title}
                            entry={entry.entry}
                            key={entry.id}
                            mood={entry.mood}
                            color={entry.color}
                            date={entry.date}
                            time={entry.time}
                        />
                    ))}  
                </div>
            </div>
        </>
    );
};

