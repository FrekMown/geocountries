import React from 'react';
import './IndicatorItem.css';

const IndicatorItem = (props) => (
    <div id="IndicatorItem" 
        className={props.isSelected ? "selected": null} 
        onClick={e => props.setSelIndicatorId(props.indicator.id)}>
        <div>
            <div className="bigger bold">{props.indicator.id}</div>
            <div className="smaller italics">{props.indicator.name}</div>
        </div>
    </div>
);

export default IndicatorItem;