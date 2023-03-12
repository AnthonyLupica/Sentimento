/*
    Journal.jsx defines the component for a single journal entry 
*/

/* component imports */
import React from 'react';
import { MdDeleteForever, MdDelete } from 'react-icons/md'; // these are delete icons
import tinycolor from 'tinycolor2';

/* style imports */
import '../styles/Journal.css';

export default function Journal(props) {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
    const [randomDeletePleasantry, setRandomDeletePleasantry] = React.useState('');

    // use tiny color library to slightly darken props.color by the value passed in .darken()
    const shadowColor = tinycolor(props.color).darken(25).toString();

        // an array of pre-defined placeholder text for delete confirmation messages
        const deleteTexts = [
            "Delete? Are you sure?",
            "Delete? One last chance.",
            "Confirm to proceed.",
            `Delete '${props.title}'?`,
            "Deleting is irreversible."
          ];
    
        // choose a random pleasantry from deleteTexts to display as placeholder text
        React.useEffect(() => {
            const randomIndex = Math.floor(Math.random() * deleteTexts.length);
            const randomSelect = deleteTexts[randomIndex];
    
            // set state with the random string
            setRandomDeletePleasantry(randomSelect);
        }, [showDeleteConfirmation]); 

    // chunk of UI for the default display of a trash can
    const deleteUI = (
        <>
            <button className="Delete--Button" style={{ backgroundColor: props.color }} onClick={() => setShowDeleteConfirmation(true)}>
                <MdDelete />
            </button>
        </>
    );

    // chunk of UI for display of a delete confirmation message
    const deleteConfirmationUI = (
        <div className="DeleteConfirmation--Container">
            <small className="Footer--Text Delete--Confirmation" style={{ textShadow: `1px 1px 0px ${shadowColor}` }}>{randomDeletePleasantry}</small>
            <button className="Delete--Button" 
                    style={{ backgroundColor: props.color }}
                    onClick={() => props.handleDeleteJournal(props.id)} 
                    onMouseLeave={() => setShowDeleteConfirmation(false)}
            >
                <MdDeleteForever />
            </button>
        </div>
    );
    
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

                {/* conditionally render one of the delete UIs depending on the value of showDeleteConfirmation */}
                {showDeleteConfirmation ? deleteConfirmationUI : deleteUI}
            </div>

        </div>    
    );
}