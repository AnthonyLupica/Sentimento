/*
    Journal.jsx defines the component for a single journal entry 
*/

/* component imports */
import React from 'react';
import { MdDeleteOutline, MdDelete } from 'react-icons/md'; // these are delete icons
import tinycolor from 'tinycolor2';

/* style imports */
import '../styles/Journal.css';

export default function Journal(props) {

    // use tiny color library to slightly darken props.color by the value passed in .darken()
    const shadowColor = tinycolor(props.color).darken(30).toString();
    
    return (
        <div className="JournalBox" style={{ backgroundColor: props.color }}>
           
            {/* containing div for journal title and mood display */}
            <div className="Header">
                <small className="Journal--Title" style={{ textShadow: `1px 1px 0px ${shadowColor}`}}> {props.title} </small>
                <div className="Emotion--Display" style={{ color: props.color }}>
                    <small> {props.mood} </small>
                </div>
            </div>

            {/* the journal entry content */}
            <p className="Journal--Text" style={{ textShadow: `1px 1px 0px ${shadowColor}` }}> {props.text} </p>

            {/* containing div for date of submission and delete icon */}
            <div className="Footer">
                <small className="Footer--Text" style={{ textShadow: `1px 1px 0px ${shadowColor}` }}> {props.dateAndTime} </small>
                <button className="Delete--Button" style={{ backgroundColor: props.color }} onClick={() => props.handleDeleteJournal(props.id)}>
                    <MdDelete />
                </button>
            </div>

        </div>    
    );
}