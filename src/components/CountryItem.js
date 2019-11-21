import React from 'react';
import './CountryItem.css';

const CountryItem = (props) => (
    <div id="CountryItem" 
        className={props.isSelected ? "selected": null} 
        onClick={e => props.toggleCountries(props.country.alpha3Code)}>
        <img src={props.country.flag} id="flag" 
    />
        <div>
            <div className="bigger bold">{props.country.name}</div>
            <div className="smaller italics">{props.country.nativeName}</div>
        </div>
    </div>
);

export default CountryItem;