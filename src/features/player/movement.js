import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'
import showWinningAnimation from '../winning-animation'

const getTile = pos => {
  const tiles = store.getState().map.tiles
  const y = pos[1] / SPRITE_SIZE
  const x = pos[0] / SPRITE_SIZE
  return tiles[y][x]
}

const observeBoundaries = newPos =>
  newPos[0] >= 0 &&
  newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
  (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)

const observeImpassable = newPos => {
  const nextTile = getTile(newPos)
  if (nextTile === 4) {
    showWinningAnimation()
  }
  return nextTile < 5
}

// returns an array of position as [x, y] in pixels
const getNewPosition = (oldPos, direction) => {
  switch (direction) {
    case 'WEST':
      return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
    case 'EAST':
      return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
    case 'NORTH':
      return [oldPos[0], oldPos[1] - SPRITE_SIZE]
    case 'SOUTH':
      return [oldPos[0], oldPos[1] + SPRITE_SIZE]
    default:
    // switch statements should contain a default clause but this is unreachable.
  }
}

const getWalkIndex = () => {
  const walkIndex = store.getState().player.walkIndex
  return walkIndex >= 7 ? 0 : walkIndex + 1
}

const getSpriteLocation = (direction, walkIndex) => {
  switch (direction) {
    case 'SOUTH':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`
    case 'EAST':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`
    case 'WEST':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`
    case 'NORTH':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`
    default:
    // switch statements should contain a default clause but this is unreachable.
  }
}

const dispatchMove = (direction, newPos) => {
  const walkIndex = getWalkIndex()
  const spriteLocation = getSpriteLocation(direction, walkIndex)
  store.dispatch({
    type: 'MOVE_PLAYER',
    payload: {
      position: newPos,
      direction,
      walkIndex,
      spriteLocation
    }
  })
}

const hasWon = oldPos => getTile(oldPos) === 4

const attemptMove = direction => {
  const oldPos = store.getState().player.position
  const newPos = getNewPosition(oldPos, direction)

  const isAPossibleMove =
    observeBoundaries(newPos) && observeImpassable(newPos) && !hasWon(oldPos)

  if (isAPossibleMove) {
    dispatchMove(direction, newPos)
  }
}

const handleKeyDown = e => {
  e.preventDefault()

  switch (e.keyCode) {
    case 37:
      return attemptMove('WEST')
    case 38:
      return attemptMove('NORTH')
    case 39:
      return attemptMove('EAST')
    case 40:
      return attemptMove('SOUTH')
    default:
    // switch statements should contain a default clause but this is unreachable.
  }
}

const handleMovement = player => {
  window.addEventListener('keydown', e => {
    handleKeyDown(e)
  })

  return player
}

export default handleMovement
