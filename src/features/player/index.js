import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";
import handleMovement from "./movement";

const Player = ({ position, spriteLocation }) => (
  <div
    style={{
      position: "absolute",
      top: position[1],
      left: position[0],
      backgroundImage: `url('${walkSprite}')`,
      backgroundPosition: spriteLocation,
      width: "40px",
      height: "40px"
    }}
  />
);

const mapStateToProps = state => ({
  ...state.player
});

export default connect(mapStateToProps)(handleMovement(Player));
