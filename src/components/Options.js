import React, { useState, useEffect } from 'react';
import './Options.css';
import CountryItem from "./CountryItem";
import IndicatorItem from "./IndicatorItem";

const N_INDICATORS = 50;

function Options(props) {
  const [type, setType] = useState("countries"); // can be either countries or indicators
  const [topics, setTopics] = useState([]); // array of all topics
  const [currTopicId, setCurrTopicId] = useState("none"); // selected topic
  const [indicators, setIndicators] = useState([]); // array of all indicators

  // Create form for types (countries or indicators)
  const radioForm = (
    <form id="options-form" onChange={e => setType(e.target.value)}>
      <label>
        <input type="radio" value="countries" name="type" defaultChecked={type === "countries"} />
        Countries
      </label>
      <label>
        <input type="radio" value="indicators" name="type" defaultChecked={type === "indicators"} />
        Indicators
      </label>
    </form>
  );

  // Load all topics at the beginning
  function getTopics() {
    const topicsURL = "https://api.worldbank.org/v2/topic?format=json";
    fetch(topicsURL)
      .then(response => response.json())
      .then(data => setTopics(data[1]))
      .catch(err => console.log(err))
  }
  useEffect(getTopics, []);


  // Create select for topics
  let topicsSelect = null;
  if (type === "indicators") {
    topicsSelect = (
      <select
        value={currTopicId}
        onChange={e => setCurrTopicId(e.target.value)}
      >
        <option value={"none"}>Please Choose a Topic</option>
        {topics.map(t => (<option key={t.id} value={t.id}>{t.value}</option>))}
      </select>
    );
  }

  // Whenever currTopicId changes, load the indicators
  function fetchIndicatorsForTopic() {
    if (currTopicId === "none") setIndicators([]);
    else {
      const indicatorsURL = `https://api.worldbank.org/v2/topic/${currTopicId}/indicator?format=json&per_page=${N_INDICATORS}`;
      fetch(indicatorsURL)
        .then(response => response.json())
        .then(data => setIndicators(data[1]))
    }
  }
  useEffect(fetchIndicatorsForTopic, [currTopicId]);


  // Create IndicatorItems elements when indicators change
  let indicatorItems = null;
  if (type === "indicators") {
    indicatorItems = indicators.map(ind => (
      <IndicatorItem
        key={ind.id}
        indicator={ind}
        setSelIndicatorId={props.setSelIndicatorId}
        isSelected={ind.id === props.selIndicatorId}
      />
    ));
  }







  // Creation of country Items for all countries
  let allCountriesItems = null;
  if (type === "countries") {
    allCountriesItems = props.allCountries.map(country => (
      <CountryItem
        country={country}
        key={country.alpha3Code}
        isSelected={props.selCountriesIds.indexOf(country.alpha3Code) >= 0}
        toggleCountries={props.toggleCountries}
      />
    ));
  }


  return (
    <div id="Options">
      <div className="title">Options</div>
      <div className="list-items">
        {radioForm}
        {topicsSelect}
        {allCountriesItems}
        {indicatorItems}
      </div>
    </div>
  );
}

export default Options;
