// All code should be written in this file.
// global variables
let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;
let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;
let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;
let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

//helper functions
const checkType = (moveType) => moveType === 'rock' || moveType === 'paper' || moveType === 'scissors';
const checkRange = (moveValue) => moveValue < 1 || moveValue > 99;
const invalidRound = (round) => round > 3 || round < 1;

const missingValues = (round) => {
  if (round === 1) {
    if (!playerOneMoveOneType || !playerTwoMoveOneType || !playerOneMoveOneValue || !playerTwoMoveOneValue) {
      return true;
    }
  } else if (round === 2) {
    if (!playerOneMoveTwoType || !playerTwoMoveTwoType || !playerOneMoveTwoValue || !playerTwoMoveTwoValue) {
      return true;
    }
  } else if (round === 3) {
    if (!playerOneMoveThreeType || !playerTwoMoveThreeType || !playerOneMoveThreeValue || !playerTwoMoveThreeValue) {
      return true;
    }
  }
};

const bunkRoundData = (round) => {
  if (invalidRound(round) || missingValues(round)) {
    return true;
  }
};

const evaluateMove = (playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue) => {
    if (playerOneMoveType === playerTwoMoveType) {
      if (playerOneMoveValue > playerTwoMoveValue) {
        return 'Player One';
      } else if (playerOneMoveValue < playerTwoMoveValue) {
        return 'Player Two';
      } else {
        return 'Tie';
      }
    }
    if (playerOneMoveType === 'rock') {
      if (playerTwoMoveType === 'scissors') {
        return 'Player One';
      } else {
        return 'Player Two';
      }
    } else if (playerOneMoveType === 'scissors') {
      if (playerTwoMoveType === 'paper') {
        return 'Player One';
      } else {
        return 'Player Two';
      }
    } else if (playerOneMoveType === 'paper') {
      if (playerTwoMoveType === 'rock') {
        return 'Player One';
      } else {
        return 'Player Two';
      }
    }
};

// assign the moves(type and value) to each player
const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
  // bail if we don't get an acceptable move type
  if (!checkType(moveOneType) || !checkType(moveTwoType) || !checkType(moveThreeType)) {
    return null;
  }
  // bail if the values are out of range
  if (checkRange(moveOneValue) || checkRange(moveTwoValue) || checkRange(moveThreeValue)) {
    return null;
  }
  // bail if the sum of the values is out of range
  if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
    return null;
  }
  // bail if we're missing any move values
  if (!moveOneValue || !moveTwoValue || !moveThreeValue) {
    return null;
  }
  // only assign moves if we get the proper player 'name'
  switch (player) {
    case 'Player One':
      playerOneMoveOneType = moveOneType;
      playerOneMoveOneValue = moveOneValue;
      playerOneMoveTwoType = moveTwoType;
      playerOneMoveTwoValue = moveTwoValue;
      playerOneMoveThreeType = moveThreeType;
      playerOneMoveThreeValue = moveThreeValue;
      break;
    case 'Player Two':
      playerTwoMoveOneType = moveOneType;
      playerTwoMoveOneValue = moveOneValue;
      playerTwoMoveTwoType = moveTwoType;
      playerTwoMoveTwoValue = moveTwoValue;
      playerTwoMoveThreeType = moveThreeType;
      playerTwoMoveThreeValue = moveThreeValue;
      break;
    default:
      return null;
  }
};

// determine the round winner
const getRoundWinner = (round) => {
  if (bunkRoundData(round)) {
    return null;
  }
  let playerOneMoveType;
  let playerOneMoveValue;
  let playerTwoMoveType;
  let playerTwoMoveValue;
  if (round === 1) {
    playerOneMoveType = playerOneMoveOneType;
    playerOneMoveValue = playerOneMoveOneValue;
    playerTwoMoveType = playerTwoMoveOneType;
    playerTwoMoveValue = playerTwoMoveOneValue;
  } else if (round === 2) {
    playerOneMoveType = playerOneMoveTwoType;
    playerOneMoveValue = playerOneMoveTwoValue;
    playerTwoMoveType = playerTwoMoveTwoType;
    playerTwoMoveValue = playerTwoMoveTwoValue;
  } else if (round === 3) {
    playerOneMoveType = playerOneMoveThreeType;
    playerOneMoveValue = playerOneMoveThreeValue;
    playerTwoMoveType = playerTwoMoveThreeType;
    playerTwoMoveValue = playerTwoMoveThreeValue;
  }
  return evaluateMove(playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue);
};

// determine the game winner
const getGameWinner = () => {
  //set score variables to hold the running score between rounds
  let playerOneScore = 0;
  let playerTwoScore = 0;
  //determine round 1 winner
  if (getRoundWinner(1) === 'Player One') {
    playerOneScore++;
  } else if (getRoundWinner(1) === 'Player Two') {
    playerTwoScore++;
  } else if (getRoundWinner(1) === null) {
    return null;
  }
  //determine round 2 winner
  if (getRoundWinner(2) === 'Player One') {
    playerOneScore++;
  } else if (getRoundWinner(2) === 'Player Two') {
    playerTwoScore++;
  } else if (getRoundWinner(2) === null) {
    return null;
  }
  //determine round 3 winner
  if (getRoundWinner(3) === 'Player One') {
    playerOneScore++;
  } else if (getRoundWinner(3) === 'Player Two') {
    playerTwoScore++;
  } else if (getRoundWinner(3) === null) {
    return null;
  }
  //determine game winner
  if (playerOneScore > playerTwoScore) {
    return 'Player One';
  } else if (playerOneScore < playerTwoScore) {
    return 'Player Two';
  } else {
    return 'Tie';
  }
};

const setComputerMoves = () => {
  const moves = ['rock', 'paper', 'scissors']
  const moveOneType = moves[Math.floor(Math.random() * 3)];
  const moveTwoType = moves[Math.floor(Math.random() * 3)];
  const moveThreeType = moves[Math.floor(Math.random() * 3)];
  const moveOneValue = Math.floor(Math.random() * 96 + 1);
  const moveTwoValue = Math.floor(Math.random() * (97 - moveOneValue) + 1);
  const moveThreeValue = 99 - moveTwoValue - moveOneValue;
  setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType,
                  moveTwoValue, moveThreeType, moveThreeValue);
};
