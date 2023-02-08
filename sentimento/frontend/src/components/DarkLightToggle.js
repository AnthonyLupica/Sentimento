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

        // switch class names for theme switch 
        document.body.className = "body" + theme;
        document.getElementById("nav").className = "nav" + theme;
    }, [theme]);

    return (
        <label className="DarkLight">
            <input type="checkbox" onClick={toggler} />
            <span className="toggler round"></span>
        </label>
    );
};
