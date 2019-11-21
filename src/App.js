import React, { useState } from 'react';
import Summary from './components/Summary';
import Navbar from './components/Navbar';
import Options from './components/Options';
import Plots from './components/Plots';
import './App.css';

import allCountries from './allCountries';

function App() {
  const [selCountriesIds, setSelCountriesIds] = useState(["IND", "CHL", "FRA"]);

  const [selIndicatorId, setSelIndicatorId] = useState("none");

  // Function to add or remove countries from selCountriesIds
  function toggleCountries(countryId) {
    if (selCountriesIds.indexOf(countryId) === -1) setSelCountriesIds([...selCountriesIds, countryId]);
    else setSelCountriesIds(selCountriesIds.filter(selCountryId => selCountryId !== countryId));
  }

  return (
    <div id="App">
      <Navbar />
      <div id="app-main-content">
        <Options
          allCountries={allCountries}
          selCountriesIds={selCountriesIds}
          toggleCountries={toggleCountries}
          setSelIndicatorId={setSelIndicatorId}
          selIndicatorId ={selIndicatorId}
        />
        <Plots 
          selCountriesIds={selCountriesIds}
          selIndicatorId={selIndicatorId}
        />
        <Summary
          allCountries={allCountries}
          selCountriesIds={selCountriesIds}
          toggleCountries={toggleCountries}
          selIndicatorId ={selIndicatorId}
        />
      </div>
    </div>
  );
}

export default App;
