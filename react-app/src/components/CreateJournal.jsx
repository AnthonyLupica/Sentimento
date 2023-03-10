/*
    Navbar.jsx defines the navigation bar, which houses the logo, and any interactivity buttons 
*/

/* component imports */
import React from 'react'; 
import {MdOutlineSave, MdSave} from 'react-icons/md'; // these are save icons

/* style imports */
import '../styles/Journal.css';
import '../styles/CreateJournal.css';

export default function CreateJournal(props) {
    
    // define state
    const [journalTitle, setJournalTitle] = React.useState('');
    const [journalText, setJournalText] = React.useState('');
    const [randomPleasantry, setRandomPleasantry] = React.useState('');

    // define how many characters the user can type in each text area 
    const journalTextLimit = 500;
    const journalTitleLimit = 45;

    // an array of pre-defined placeholder text for a new journal entry (have fun with this)
    const placeholderTexts = [
        "Tell me about it...",
        "How was your day?",
        "What's on your mind?",
        "Share your thoughts...",
        "What's happening?",
        "Write something...",
        "What's new?",
        "Wanna talk about it?",
        "What's been on your mind lately?",
        "Share your insights...",
        "How have you been feeling?",
        "Let's hear your thoughts...",
        "What's new in your world?",
        "What's the tea, girl?"
      ];

    // choose a random pleasantry from placeholderTexts to display as placeholder text
    React.useEffect(() => {
        const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
        const randomSelect = placeholderTexts[randomIndex];

        // set state with the random string
        setRandomPleasantry(randomSelect);
    }, []); // this runs ONCE, when the component first mounts

    // event handler called whenever the value of the textarea for the journal text changes 
    function handleJournalText(event) {
        // call setJournalText only if the value the character has typed does not exceed the character limit 
        if (journalTextLimit - event.target.value.length >= 0) {
            setJournalText(event.target.value);
        }
    }

    // event handler called whenever the value of the textarea for the journal title changes 
    function handleJournalTitle(event) {
        // check for the existence of a newline character
        if (event.target.value.includes('\n')) {
            return; // do nothing and return early
        }

        // call setJournalTitle only if the value the character has typed does not exceed the character limit 
        if (journalTitleLimit - event.target.value.length >= 0) {
            setJournalTitle(event.target.value);
        }
    }
    
    // event handler called whenever the save button is clicked. It in turn calls the handler for creating a new journal 
    // passed all the way from App.jsx
    function handleSaveClick() {
        // validate that both title and text have been given 
        if (journalTitle !== '' && journalText !== '') {
            // pass the valid values of state to handleCreateJournal
            props.handleCreateJournal(journalTitle, journalText);

            // reset state for next new entry
            setJournalTitle('');
            setJournalText('');

            // call handler to toggler state determining if this component should render
            props.handleShowCreateJournal();
        } else {
            // @TODO may want to visually indicate to the user that they need to provide title and text with an alert
        }
    }

    return (
        // two classNames, taking all styles of a JournalBox and adding more for a NewJournalBox
        <div className="JournalBox NewJournalBox">
            
            {/* containing div for the title of the journal entry */}
            <div className="Header">
                <textarea
                    rows='1'
                    cols='90'
                    placeholder="Title..."
                    value={journalTitle}
                    onChange={handleJournalTitle}
                ></textarea>
            </div>
            
            {/* textarea for journal text */}
            <textarea 
                className="Create--Text"
                rows='8'
                cols='90'
                placeholder={randomPleasantry}
                value={journalText}
                onChange={handleJournalText}
            ></textarea>

            {/* containing div for character count and save button */}
            <div className="Footer">
                <small className="Character--Count"> {journalTextLimit - journalText.length} characters remaining </small>
                <button className="Save--Button" onClick={handleSaveClick}><MdSave /></button>
            </div>

        </div>
    );
}