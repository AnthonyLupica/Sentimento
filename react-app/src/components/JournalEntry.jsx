import React from 'react';
import '../styles/JournalEntry.css';

export default function JournalEntry(props) {
    let boxColor;

    switch (props.mood) {
        case 'Joyful':
            boxColor = 'Orange';
            break;
        case 'Sad':
            boxColor = 'LightSkyBlue';
            break;
        case 'Angry':
            boxColor = 'Maroon';
            break;
        case 'Fearful':
            boxColor = 'Plum';
            break;
        case 'Disgusted':
            boxColor = 'DarkOliveGreen';
            break;
        default:
            boxColor = 'DarkGray';
    }

    console.log("JournalEntry component rendered");
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