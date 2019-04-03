import store from "../../config/store";
import { SPRITE_SIZE } from "../../config/constants";

// returns an array of position as [x, y] in pixels
const getNewPosition = direction => {
  const oldPos = store.getState().player.position;
  switch (direction) {
    case "WEST":
      return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
    case "EAST":
      return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
    case "NORTH":
      return [oldPos[0], oldPos[1] - SPRITE_SIZE];
    case "SOUTH":
      return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    default:
      console.log(direction);
  }
};

const dispatchMove = direction => {
  store.dispatch({
    type: "MOVE_PLAYER",
    payload: {
      position: getNewPosition(direction)
    }
  });
};

const handleKeyDown = e => {
  e.preventDefault();

  switch (e.keyCode) {
    case 37:
      return dispatchMove("WEST");

    case 38:
      return dispatchMove("NORTH");

    case 39:
      return dispatchMove("EAST");

    case 40:
      return dispatchMove("SOUTH");

    default:
      console.log(e.keyCode);
  }
};

const handleMovement = player => {
  // official KeyboardEvent - The keydown event is fired when a key is pressed down.
  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  return player;
};

export default handleMovement;
