/*
    Journal.jsx defines the component for a single journal entry 
*/

/* component imports */
import React from 'react';
import { MdDeleteForever, MdDelete } from 'react-icons/md'; 
import { FaQuestionCircle } from 'react-icons/fa'; 
import { IoMdMore } from 'react-icons/io';
import tinycolor from 'tinycolor2';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Popup from 'reactjs-popup';
import EmotionProperties from '../EmotionProperties'; 

/* style imports */
import '../styles/Journal.css';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Journal(props) {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
    const [randomDeletePleasantry, setRandomDeletePleasantry] = React.useState('');

    // logic to determine shadow colors
    let shadowColor;
    if (tinycolor(props.color).isLight()) {
        // shadow color is darker
        shadowColor = tinycolor(props.color).darken(5).toString();
    } else {
        // shadow color is lighter
        shadowColor = tinycolor(props.color).lighten(5).toString();
    }

    // set text color to darker shade of card color
    let textColor;
    textColor = tinycolor(props.color).darken(45).toString();

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
            <small className="Footer--Text Delete--Confirmation" style={{ textShadow: `1px 1px 0px ${textColor}` }}>{randomDeletePleasantry}</small>
            <button className="Delete--Button" 
                    style={{ backgroundColor: props.color }}
                    onClick={() => props.handleDeleteJournal(props.id)} 
                    onMouseLeave={() => setShowDeleteConfirmation(false)}
            >
                <MdDeleteForever />
            </button>
        </div>
    );

    // the journal is in a loading state, render a loading skeleton
    if (props.mood === "loading" || props.color === "loading") {
        return (
            <SkeletonTheme baseColor='#252525' highlightColor='#2f2f2f' duration={3} >
                <Skeleton count={1} height={180} borderRadius={15} />
            </SkeletonTheme>
        )
    }

    // store top three emotions, their percentages, and their hex codes
    // props.topThreeEmotions comes in as [ ["1st emotion", percentage], ["2nd emotion", percentage], ["3rd emotion", percentage] ]
    const topEmotion = {
        "emotion": props.topThreeEmotions[0][0],
        "percentage": Math.round(props.topThreeEmotions[0][1] * 100),
        "hexcode": EmotionProperties[props.topThreeEmotions[0][0]]
    };
    const secondEmotion = {
        "emotion": props.topThreeEmotions[1][0],
        "percentage": Math.round(props.topThreeEmotions[1][1] * 100),
        "hexcode": EmotionProperties[props.topThreeEmotions[1][0]]
    };
    const thirdEmotion = {
        "emotion": props.topThreeEmotions[2][0],
        "percentage": Math.round(props.topThreeEmotions[2][1] * 100),
        "hexcode": EmotionProperties[props.topThreeEmotions[2][0]]
    };
 
    return (
        
        <div className="JournalBox" style={{ backgroundColor: props.color, boxShadow: `inset 0 0 0 2px ${shadowColor}` }}>
           
            {/* containing div for journal title and mood display */}
            <div className="Header">
                <small className="Journal--Title" style={{ textShadow: `1px 1px 0px ${textColor}`}}> {props.title} </small>
                <div className="Emotion--Display" style={{ color: props.color, boxShadow: `inset 0 0 0 2px ${shadowColor}` }}>
                    <small> {props.mood} </small>

                    <Popup
                        trigger={
                            <button type="button" className="Emotion--BreakdownHover">
                                <FaQuestionCircle style={{ color: props.color }} />
                            </button>
                        }
                        position='bottom center'
                        on={['hover', 'focus']}
                    >
                        <div className="Emotion--Breakdown">
                            {topEmotion.percentage}% {topEmotion.emotion}
                            <div
                                className="Emotion--One"
                                style={{ backgroundColor: topEmotion.hexcode, width: topEmotion.percentage + "%" }}
                            ></div><hr />

                            {secondEmotion.percentage}% {secondEmotion.emotion}
                            <div
                                className="Emotion--Two"
                                style={{ backgroundColor: secondEmotion.hexcode, width: secondEmotion.percentage + "%" }}
                            ></div><hr />

                            {thirdEmotion.percentage}% {thirdEmotion.emotion}
                            <div
                                className="Emotion--Three"
                                style={{ backgroundColor: thirdEmotion.hexcode, width: thirdEmotion.percentage + "%" }}
                            ></div><hr />

                            <div className="Ellipsis">
                                <IoMdMore />
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>

            {/* the journal entry content */}
            <p className="Journal--Text" style={{ textShadow: `1px 1px 0px ${textColor}` }}> {props.text} </p>

            {/* containing div for date of submission and delete icon */}
            <div className="Footer">
                <small className="Footer--Text" style={{ textShadow: `1px 1px 0px ${textColor}` }}> {props.dateAndTime} </small>

                {/* conditionally render one of the delete UIs depending on the value of showDeleteConfirmation */}
                {showDeleteConfirmation ? deleteConfirmationUI : deleteUI}
            </div>

        </div>    
    );
}

