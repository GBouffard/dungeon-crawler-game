import React from "react";
import Map from "../map";
import { tiles } from "../../data/maps/1";
import Player from "../player";

const World = () => (
  <div
    style={{
      position: "relative",
      width: "800px",
      height: "400px",
      margin: "20px auto"
    }}
  >
    <Map tiles={tiles} />
    <Player />
  </div>
);

export default World;
