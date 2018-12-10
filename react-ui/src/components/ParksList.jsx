import React from "react";
import ParksListItem from "./ParksListItem.jsx";
// var parks = require('./test.js').parks;
const ParksList = props => {
  return (
    <div>
      {props.parks.map(function (park, index) {
        return <ParksListItem parkInfo={park} key={index} />;
      })}
    </div>
  );
};

export default ParksList;
