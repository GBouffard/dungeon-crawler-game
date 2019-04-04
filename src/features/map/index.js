import React from "react";
import { SPRITE_SIZE } from "../../config/constants";
import "./styles.css";

const getTileSprite = type => {
  switch (type) {
    case 0:
      return "grass";
    case 5:
      return "rock";
    case 6:
      return "tree";
    default:
      return "grass";
  }
};

const MapTile = ({ tile }) => (
  <div
    className={`tile ${getTileSprite(tile)}`}
    style={{
      height: SPRITE_SIZE,
      width: SPRITE_SIZE
    }}
  />
);

const MapRow = ({ tiles }) => (
  <div
    className="row"
    style={{
      height: SPRITE_SIZE
    }}
  >
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
