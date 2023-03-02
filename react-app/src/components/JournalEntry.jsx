import React from 'react';
import '../styles/JournalEntry.css';

export default function JournalEntry(props) {
    // locally store the mood-associated color from the given prop value
    let boxColor = props.color;

    return (
        <div className="JournalBox" style={{ backgroundColor: boxColor }}>
            <div className="Headerbox">
                <h3 className="Journal--Header">{props.title}</h3>
                <div className="Emotion--Display" style={{ color: boxColor }}>
                    <p className="Emotion--Text">{props.mood}</p>
                </div>
            </div>
            <p className="Journal--Text">{props.entry}</p>
            <div className="TimeAndDateBox">
                <p className="TimeAndDate">{props.time}</p>
                <p className="TimeAndDate">{props.date}</p>
            </div>
        </div>    
    );
};