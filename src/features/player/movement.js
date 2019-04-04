import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

const observeBoundaries = newPos =>
  newPos[0] >= 0 &&
  newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
  (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE);

const observeImpassable = newPos => {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;
  const nextTile = tiles[y][x];
  return nextTile < 5;
};

// returns an array of position as [x, y] in pixels
const getNewPosition = (oldPos, direction) => {
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

const dispatchMove = newPos => {
  store.dispatch({
    type: "MOVE_PLAYER",
    payload: {
      position: newPos
    }
  });
};

const attemptMove = direction => {
  const oldPos = store.getState().player.position;
  const newPos = getNewPosition(oldPos, direction);
  const isAPossibleMove =
    observeBoundaries(newPos) && observeImpassable(newPos);

  if (isAPossibleMove) {
    dispatchMove(newPos);
  }
};

const handleKeyDown = e => {
  e.preventDefault();

  switch (e.keyCode) {
    case 37:
      return attemptMove("WEST");
    case 38:
      return attemptMove("NORTH");
    case 39:
      return attemptMove("EAST");
    case 40:
      return attemptMove("SOUTH");
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
