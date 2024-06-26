/*
    Navbar.jsx defines the navigation bar, which houses the logo, and any interactivity buttons 
*/

import React from 'react';
import logo from '../assets/sentimento-logo.png'; 
import SearchJournal from './SearchJournal';
import {MdCreate} from 'react-icons/md'; // this is a create icon
import {MdClose} from 'react-icons/md'; // this is a cancel icon 
import '../styles/Navbar.css';

export default function Navbar(props) {

    return (
        <nav>
            <img src={logo} alt="Sentimento" className="sentimento--logo" />

            <div className="Button--Container">
                <SearchJournal setSearchQuery={props.setSearchQuery} />
                
                <button className="Create--Button" onClick={props.handleShowCreateJournal}>
                    {props.showCreateJournal ? <MdClose /> : <MdCreate />}
                </button>
            </div>
        </nav>
    );
}