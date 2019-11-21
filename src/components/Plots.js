import React, { useState, useEffect } from 'react';
import './Plots.css';
import Plotly from 'react-plotly.js';

function Plots(props) {
  const [plotType, setPlotType] = useState('time_series'); //can be world_map or time_series
  const [plotData, setPlotData] = useState([]); // list of elements [{}]
  const [mapYear, setMapYear] = useState(2018);


  // Verify if user has chosen at least one country and one indicator
  const optionsChosen = (props.selCountriesIds.length > 0 && props.selIndicatorId !== "none");


  // Create select menu to change plotData
  let selectPlotData = null;
  if (optionsChosen) {
    selectPlotData = (
      <select
        value={plotType}
        onChange={(e) => setPlotType(e.target.value)}
      >
        <option value="time_series">Time Series</option>
        <option value="world_map">World Map</option>
      </select>
    );
  }

  // Create menu for years if world map selected
  let selectMapYear = null;
  if (optionsChosen && plotType==="world_map") {
    const allYears = Array.from(new Set(plotData.map(item => item.year)));

    selectMapYear = (
      <select
        value={mapYear}
        onChange={e => setMapYear(parseFloat(e.target.value))}
      >
        {allYears.map(year => <option value={year}>{year}</option>)}
      </select>
    );
  }

  // Plotly
  let plotlyData = null;
  let plotlyLayout = null;
  let plotlyPlot = null;


  // Plot time series
  if (optionsChosen && plotType==="time_series") {
    plotlyData = props.selCountriesIds.map(countryId => {
      const dataPlotCountry = plotData.filter(item => item.alpha3Code === countryId);
      return {
        x: dataPlotCountry.map(item => item.year),
        y: dataPlotCountry.map(item => item.value),
        name: countryId,
        type: "scatter",
        mode: "lines+markers"
      }
    });

    plotlyLayout = {
      showlegend: true
    };
  }

  // Plot World Map
  if (optionsChosen && plotType==="world_map") {
    const dataYear = plotData.filter(item => item.year === mapYear);
    
    plotlyData = [{
      type: "choropleth",
      locations: dataYear.map(item => item.alpha3Code),
      z: dataYear.map(item => item.value),
    }]

    plotlyLayout = {
      margin: {
        t: 0,
        r: 0,
        b: 0,
        l: 0,
      },
    };
  }


  // Create Plotly object
  if (plotlyData) {
    plotlyPlot = (
      <Plotly
        data={plotlyData}
        layout={plotlyLayout}
        useResizeHandler
      />
    );
  }


  // LOAD DATA FROM WORLD BANK AND FORMAT IT
  function changeDataFormat(data) {
    // Create just one array with all data
    let newData = [];
    for (let item of data) {
      if (item) newData = [...newData, ...item];
    }

    // Filter null values
    newData = newData.filter(item => item.value !== null);

    // Return new data with new formatting
    return newData.map(item => ({
      year: parseInt(item.date),
      value: item.value,
      alpha3Code: item.alpha3Code
    }));
  }
  // Another function to format data
  function addAlpha3Code(data, countryId) {
    if(data) data.forEach(item => item.alpha3Code = countryId);
    return data;
  }
  // Fetch data from world bank, then format it and setPlotData
  function getDataWorldBank() {
    if (optionsChosen) {
      // Create promises
      const promises = props.selCountriesIds.map(countryId => {
        const worldBankURL = `https://api.worldbank.org/v2/country/${countryId}/indicator/${props.selIndicatorId}?format=json&frequency=Y&per_page=60`;
        return fetch(worldBankURL)
          .then(response => response.json())
          .then(data=> addAlpha3Code(data[1], countryId))
      });

      // Solve all promises
      Promise.all(promises)
        .then(data => changeDataFormat(data))
        .then(data => setPlotData(data))      
      
    }
  }

  useEffect(getDataWorldBank, [props.selCountriesIds, props.selIndicatorId]);


  return (
    <div id="Plots">
      <div className="title">Plots</div>
      {selectPlotData}
      {selectMapYear}
      {plotlyPlot}
    </div>
  );
}

export default Plots;
