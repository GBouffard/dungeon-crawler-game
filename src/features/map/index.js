import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../config/constants";

const baseUrl = process.env.PUBLIC_URL;
console.log(process.env);
const getTileSprite = type => {
  switch (type) {
    case 3: // nextTile < 5 is true so 3 is a passable tree;
    case 6:
      return "tree";
    case 4:
      return "chest";
    case 5:
      return "rock";
    default:
      return "tile";
  }
};

const MapTile = ({ tile }) => (
  <div
    style={{
      display: "inline-flex",
      backgroundColor: "#42b842",
      height: SPRITE_SIZE,
      width: SPRITE_SIZE,
      backgroundImage: `url("${baseUrl}/tiles/${getTileSprite(tile)}.png")`
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
      height: "480px",
      backgroundColor: "green",
      border: "4px solid white"
    }}
  >
    {tiles.map(row => (
      <MapRow tiles={row} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  tiles: state.map.tiles
});

export default connect(mapStateToProps)(Map);
