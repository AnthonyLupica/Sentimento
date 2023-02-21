import React from "react";
import logo from '../assets/placeholder.png'; 
import DarkLightToggle from "./DarkLightToggle";
import '../NavBar.css';

export default function NavBar() {
    return (
        <nav id="nav" className="navDark">
            <img src={logo} alt="Sentimento" className="sentimento--logo" />
            <DarkLightToggle />
        </nav>
    );
};
 