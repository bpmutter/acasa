import React, {useState} from 'react';
import SearchBar from './SearchBar';
import {makeStyles} from '@material-ui/core';
import queryString from "query-string";
import dateStringToObj from '../utils/dateStringToObj';
import MainContentWrapper from './MainContentWrapper';
import SearchResults from './SearchResults';
export default function SearchResultsPage(props){

    const parsed = queryString.parse(window.location.search);
    console.log('QS:: ', parsed)
    const [query, setQuery] = useState({
        description: parsed.query,
        lat: parseFloat(parsed.lat),
        lng: parseFloat(parsed.lng),
        homeType: parsed.homeType,
        startDate: (parsed.homeType ? dateStringToObj(parsed.startDate) : ""),
        searchRadiusKm: parsed.searchRadius || 15,
    })

    return(
    <div>
        <MainContentWrapper>
            <SearchBar/>
            <SearchResults 
                locationDescription={query.description}
                lat={query.lat}
                lng={query.lng}
                searchRadiusKm={query.searchRadiusKm}
            />

        </MainContentWrapper>
    </div>)
}