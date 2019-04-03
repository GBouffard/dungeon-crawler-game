import React from "react";

const MapTile = ({ tile }) => <div>{tile}</div>;

const MapRow = ({ tiles }) => (
  <div className="row">
    {tiles.map(tile => (
      <MapTile tile={tile} />
    ))}
  </div>
);

const Map = ({ tiles }) => (
  <div
    style={{
      position: "relative",
      top: "0px",
      left: "0px",
      width: "800px",
      height: "400px",
      backgroundColor: "green",
      border: "4px solid white"
    }}
  >
    {tiles.map(row => (
      <MapRow tiles={row} />
    ))}
  </div>
);

export default Map;
