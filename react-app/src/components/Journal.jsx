/*
    Journal.jsx defines the component for a single journal entry 
*/

/* component imports */
import React from 'react';
import {MdDeleteOutline, MdDelete} from 'react-icons/md'; // these are delete icons

/* style imports */
import '../styles/Journal.css';

export default function Journal(props) {

    return (
        <div className="JournalBox" style={{ backgroundColor: props.color }}>
           
            {/* containing div for journal title and mood display */}
            <div className="Header">
                <small className="Journal--Title"> {props.title} </small>
                <div className="Emotion--Display" style={{ color: props.color }}>
                    <small> {props.mood} </small>
                </div>
            </div>

            {/* the journal entry content */}
            <p className="Journal--Text"> {props.text} </p>

            {/* containing div for date of submission and delete icon */}
            <div className="Footer">
                <small className="Footer--Text"> {props.dateAndTime} </small>
                <MdDelete /> 
            </div>

        </div>    
    );
}