import React from "react";
import logo from '../assets/sentimento-logo.png'; 
import DarkLightToggle from "./DarkLightToggle";
import '../styles/NavBar.css';

export default function NavBar() {

    return (
        <nav id="nav" className="navDark">
            <img src={logo} alt="Sentimento" className="sentimento--logo" />
            <span id="cursor"></span>
            <DarkLightToggle />
        </nav>
    );
};
 