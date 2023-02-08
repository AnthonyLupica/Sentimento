import React from 'react';
import '../JournalEntry.css';

export default function JournalEntry(props) {

    let boxColor;

    switch (props.mood) {
        case 'Joyful':
            boxColor = 'LightYellow';
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

    return (
        <div className="JournalBox" style={{ backgroundColor: boxColor }}>
            <h3>{props.title}</h3>
            <p>{props.entry}</p>
            <div className="TimeAndDate">
                <p>Time: {props.time}</p>
                <p>Date: {props.date}</p>
            </div>
        </div>    
    );
};