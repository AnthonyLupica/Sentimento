/*
    SearchJournal.jsx defines a search bar, which can be used to search a journals based on mood  
*/

import React from 'react';
import {MdSearch} from 'react-icons/md'; 
import '../styles/SearchJournal.css';

export default function SearchJournal(props) {

    return (
        <div className="Search--Bar">
            
            <MdSearch className="Search--Icon" />
            <input type="text" maxLength="35" placeholder="search by mood ..." onChange={(event) => props.setSearchQuery(event.target.value)} />

        </div>
    );
}