import React, { useState, useEffect } from 'react';
import '../DarkLightToggle.css';

export default function DarkLightToggle() {

    /*
       theme = holds current state
       toggleTheme = function to change current state
       useState(false) = passes in initial state for theme of 'Light'
    */
    const [theme, toggleTheme] = useState('Light');

    // toggler gets called on button click, and simply switches the theme
    const toggler = () => {
        if (theme === 'Light') {
            toggleTheme('Dark');
        } else {
            toggleTheme('Light');
        }
    };

    // useEffect hook to switch classNames and make decisions according to theme state
    useEffect(() => {

        // switch any class names for the theme switch 
        document.body.className = "body" + theme;
        document.getElementById("nav").className = "nav" + theme;

        // loop through the collection of elements returned by document.getElementsByClassName("Emotion--display") 
        // and set the backgroundColor style property based on the theme value.
        const emotionDisplay = document.getElementsByClassName("Emotion--display");

        for (let i = 0; i < emotionDisplay.length; ++i) {
            if (theme === 'Light') {
                emotionDisplay[i].style.backgroundColor = '#e2e5e9'; // set the background color for Light theme
            } else {
                emotionDisplay[i].style.backgroundColor = '#282D35'; // set the background color for Dark theme
            }
        }

    }, [theme]);

    return (
        <label className="DarkLight">
            <input type="checkbox" onClick={toggler} />
            <span className="toggler"></span>
        </label>
    );
};
