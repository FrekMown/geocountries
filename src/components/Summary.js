import React from 'react';
import './Summary.css';
import CountryItem from "./CountryItem";

function Summary(props) {
  console.log(props.selIndicatorId);
  // Create indicator items
  let indicatorItem = null;
  if (props.selIndicatorId !== "none") {
    indicatorItem = (
      <div style={{textAlign: "center"}}>
        <div className="title">Selected Indicator</div>
        <div className="bigger bold italics sel-indicator">{props.selIndicatorId}</div>
      </div>
    );
  }
  console.log(indicatorItem);

  // Create country items
  const countryItems = props.selCountriesIds.map(countryId =>{
    const country = props.allCountries.filter(country => country.alpha3Code === countryId)[0]
    return (
      <CountryItem
        country={country}
        key={country.alpha3Code}
        toggleCountries={props.toggleCountries}
      />
    );
  });

  return (
    <div id="Summary">
      <div className="title">Summary</div>
          {indicatorItem}
      <div className="title">Selected Countries</div>
      <div className="list-items">
        {countryItems}
      </div>
    </div>
  );
}

export default Summary;
