﻿import React from 'react';
import '../styles/DarkLightToggle.css';

export default function DarkLightToggle() {

    /*
       theme = holds current state
       toggleTheme = function to change current state
       useState() = passes in initial state for theme
    */
    const [theme, toggleTheme] = React.useState('Dark');

    // toggler gets called on button click, and simply switches the theme
    const toggler = () => {
        if (theme === 'Light') {
            toggleTheme('Dark');
        } else {
            toggleTheme('Light');
        }
    };

    // useEffect hook to switch classNames and make decisions according to theme state
    React.useEffect(() => {

        // switch any class names for the theme switch 
        document.body.className = "body" + theme;
        document.getElementById("nav").className = "nav" + theme;

        // loop through the collection of elements returned by document.getElementsByClassName("Emotion--display") 
        // and set the backgroundColor style property based on the theme value.
        const emotionDisplay = document.getElementsByClassName("Emotion--Display");

        for (let i = 0; i < emotionDisplay.length; ++i) {
            if (theme === 'Light') {
                emotionDisplay[i].style.backgroundColor = '#e2e5e9'; // set the background color for Light theme
            } else {
                emotionDisplay[i].style.backgroundColor = '#282D35'; // set the background color for Dark theme
            }
        }

    }, [theme]);

    console.log("DarkLightToggle component rendered");
    return (
        <label className="DarkLight">
            <input type="checkbox" onClick={toggler} />
            <span className="toggler"></span>
        </label>
    );
};
