import React from "react";
import logo from '../assets/placeholder.png'; // Tell Webpack this JS file uses this image
import DarkLightToggle from "./DarkLightToggle";
import '../NavBar.css';

export default function NavBar() {
    return (
        <nav id="nav" className="navDark">
            <img src={logo} alt="Sentimento" className="sentimento--logo" />
            <DarkLightToggle />
        </nav>
    )
}
 