import React, {useState} from 'react';
import SearchBar from './SearchBar';
import {makeStyles} from '@material-ui/core';
import queryString from "query-string";


export default function SearchResultsPage(props){

    const parsed = queryString.parse(window.location.search);
    console.log('QS:: ', parsed)
    // const [query, setQuery] = useState({
    //     description: parsed.query,
    //     lat: parseFloat(parsed.lat),
    //     lng: parseFloat(parsed.lng),
    //     homeType: parsed.homeType === "undefined" ? 
    // })

    return(<div>
        hello world
    </div>)
}