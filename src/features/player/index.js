import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";
import handleMovement from "./movement";

const Player = props => (
  <div
    style={{
      position: "absolute",
      top: props.position[1],
      left: props.position[0],
      backgroundImage: `url('${walkSprite}')`,
      backgroundPosition: "0 0",
      width: "40px",
      height: "40px"
    }}
  />
);

const mapStateToProps = state => ({
  ...state.player
});

export default connect(mapStateToProps)(handleMovement(Player));
