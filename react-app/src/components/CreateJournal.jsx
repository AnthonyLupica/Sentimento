/* component imports */
import React from 'react'; 
import {MdOutlineSave, MdSave} from 'react-icons/md'; // these are save icons

/* style imports */
import '../styles/Journal.css';
import '../styles/CreateJournal.css';

export default function CreateJournal(props) {
    // define state for this component
    const [journalTitle, setJournalTitle] = React.useState('');
    const [journalText, setJournalText] = React.useState('');
    const [randomPleasantry, setRandomPleasantry] = React.useState('');

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
        "What's new in your world?"
      ];

    // choose a random pleasantry from placeholderTexts to display as placeholder text
    React.useEffect(() => {
        const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
        const randomPleasantry = placeholderTexts[randomIndex];

        // set state with the random string
        setRandomPleasantry(randomPleasantry);
    }, []); // empty dependency array means this runs ONCE, when the component first mounts

    // event handler called whenever the value of the textarea for jounral text changes 
    function handleJournalText(event) {
        setJournalText(event.target.value)
    }

    // event handler called whenever the value of the textarea for jounral title changes 
    function handleJournalTitle(event) {
        setJournalTitle(event.target.value)
    }
    
    // event handler called whenever the save button is clicked. It in turn calls the handler for creating a new journal 
    // passed all the way from App.jsx
    function handleCreateClick() {
        // validate that both title and text have been given 
        if (journalTitle === '' || journalText === '') {
            // temp validation. Make this look better by conditionally rendering an alert message later on
            window.alert("not created, please supply a title and text");
            return;
        }

        // pass the value of state to handle
        props.handleCreateJournal(journalTitle, journalText);
    }

    return (
        /* the containing div has two classNames, taking all styles of a JournalBox 
           and adding more for a NewJournalBox
        */
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
                rows='8'
                cols='90'
                placeholder={randomPleasantry}
                value={journalText}
                onChange={handleJournalText}
            ></textarea>

            {/* containing div for character count and save button */}
            <div className="Footer">
                <small className="Character--Count"> 200 characters remaining </small>
                <button className="Create--Button" onClick={handleCreateClick}><MdSave /></button>
            </div>

        </div>
    );
}