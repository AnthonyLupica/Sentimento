/*
 * app.js is the main component of the application, which serves as a container for other components. 
 * Responsible for the logic of the overall structure and behavior of the application, 
 * and will include routing and state management
 */

import React from "react";
import NavBar from "./components/NavBar";
import JournalEntry from "./components/JournalEntry";
import './styles/JournalEntry.css';

export default function App() {

    return (
        <div className="TheContainerAboveAll">
            <NavBar />

            <div className="JournalContainerContainer">
                <div className="JournalContainerLeft">
                    <JournalEntry mood="Default" title="A test for flex box" entry="This is a test for the flex box" time="8:00pm" date="February 17 2023" />
                    <JournalEntry
                        mood="Sad"
                        title="Long Entry"
                        entry="This is a longer entry to test the capabilities of the journal box to expand. The intended behavior is for a journal entry to 
                               be able to grow, independent of its neighboring entries. Eventually, the hope is to have to seperate flexboxes in charge of rendering entries
                               to either half of the screen. This way, it may be easier to allow entries to be how ever long they need to be, without infringing on others.
                               Sentimento: A reinvented journal. Entries will be scanned and highlighted for emotive words, such as happy/sad/ etc upon submission. These will be split 
                               into percentages that comprise a mood for the day. Using RGB for each 5 emotions, a color for the day will be created. This can be tracked for the week, month, 
                               year, etc. and can help users track their moods/emotions/feelings through that time."
                        time="7:00pm"
                        date="February 15 2023"
                    />
                </div>
                <div className="JournalContainerRight">
                    <JournalEntry mood="Joyful" title="Notes on my Day" entry="It was a great day at the amusement park!" time="6:00pm" date="1/31/23" />
                    <JournalEntry
                        mood="Fearful"
                        title="Not sure what comes next"
                        entry="Every day I stare further into the abyss. What's it all mean? Making this journal entry longer to illustrate the dynamic sizing of the flex boxes!!!!!!!!!!!!!!!!!!!!!! Yay it woooorrrrrrrrrrrrrrrrrrrrkssssssssssss"
                        time="2:00am"
                        date="1/31/23"
                    />
                    <JournalEntry mood="Angry" title="How could they do this to me" entry="No way! there's no way I can let them kick me out of the gang!" time="7:00pm" date="1/31/23" />
                </div>
            </div>
        </div>
    );
};

