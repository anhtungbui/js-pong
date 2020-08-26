const gameFinishedMsg = document.getElementsByClassName("game-finished-msg");
const gameInstruction = document.getElementsByClassName("game-instruction");
const gameIntro = document.getElementById("game-intro");
const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("container");
const extra = document.getElementById("extra");
let bgm = document.getElementById("bgm");

//----------------------paddle 1-------------------------------------

const paddle = document.querySelector("#paddle1");

let position = container.offsetHeight / 2;
let direction = 0;

//------------------paddles-----------------------------------------

const paddle2 = document.querySelector("#paddle2");

let position2 = container.offsetHeight / 2;
let direction2 = 0;

document.onkeydown = (event) => {
  // console.log('keydown', event.code);
  switch (event.code) {
    case "KeyW":
      direction = -1;
      break;
    case "KeyS":
      direction = 1;
      break;

    case "ArrowUp":
      direction2 = -1;
      break;
    case "ArrowDown":
      direction2 = 1;
      break;
  }
};

document.onkeyup = (event) => {
  //console.log("keyup", event.code);
  switch (event.code) {
    case "ArrowUp":
      if (direction2 == -1) direction2 = 0;
      break;

    case "ArrowDown":
      if (direction2 == 1) direction2 = 0;
      break;
    case "KeyW":
      if (direction == -1) direction = 0;
      break;
    case "KeyS":
      if (direction == 1) direction = 0;
      break;
  }
};

const simulate2 = (time) => {
  const upBoundary = 10;
  const downBoundary = container.offsetHeight - 150;

  if (direction !== 0) {
    position += direction * 10;
    position = Math.max(upBoundary, Math.min(downBoundary, position));
    paddle1.style.top = position + "px";
  }

  if (direction2 !== 0) {
    position2 += direction2 * 10;
    position2 = Math.max(upBoundary, Math.min(downBoundary, position2));
    paddle2.style.top = position2 + "px";
  }
};

setInterval(simulate2, 1000 / 60);

//--------------SCORES-----------------------------------------------------

const Player1 = document.querySelector("#playerA");
const Player2 = document.querySelector("#playerB");

let ding = document.getElementById("ding");

let scoreA = 0;
let scoreB = 0;

let playerAscore = document.getElementById("paddle1");
function scoreForB() {
  if (scoreA < 5) {
    scoreA++;

    //------sound effect with paddles and boundaries-----------------
    ding.play();
    Player1.innerText = scoreA;
  } else {
  }
  resetBall();
}

let playerBscore = document.getElementById("paddle2");
function scoreForA() {
  if (scoreB < 5) {
    scoreB++;

    //------sound effect with paddles and boundaries-----------------
    ding.play();
    Player2.innerText = scoreB;
  } else {
  }
  resetBall();
}

//---------------ball  movement---------------------------------

const ball = container.querySelector("#ball");

let paddleGlobal = [paddle, paddle2];

let pop = document.getElementById("pop");

let x = 500;
let y = 300;

let movementY = 5;
let movementX = 5;

// --------collision-------------------------------------

function ballCollidesWithPaddle(left, top, width, height) {
  return (
    x > left - 20 &&
    x < left + width && // right
    y > top - 20 &&
    y < top + height // bottom
  );
}

function move() {
  if (y >= container.offsetHeight - 20 || y <= 0) {
    movementY *= -1;
  }

  if (x >= container.offsetWidth) scoreForB();
  if (x <= 0) scoreForA();

  paddleGlobal.forEach((p) => {
    const collides = ballCollidesWithPaddle(
      p.offsetLeft,
      p.offsetTop,
      p.offsetWidth,
      p.offsetHeight
    );

    if (collides) {
      //------sound effect with paddles and boundaries-----------------

      const reflectionFactor = -2 * (distanceY / 70) + 1;

      pop.play();
      movementX *= 1.05;

      let ballCenterY = 10 + y;
      let paddleCenterY = 70 + p.offsetTop;
      let distanceY = Math.abs(ballCenterY - paddleCenterY);

      movementY += reflectionFactor;

      if (p === paddle) {
        movementX = Math.abs(movementX);
      } else {
        movementX = Math.abs(movementX) * -1;
      }
    }
  });

  y += movementY;
  x += movementX;
  ball.style.top = `${y}px`;
  ball.style.left = `${x}px`;
}
//setInterval(move, 1000 / 60);

//-------------------------reset function----------

let win = document.getElementById("yeah");

function resetBall() {
  x = container.offsetWidth / 2;
  y = container.offsetHeight / 2;

  if (scoreA === 5 || scoreB === 5) {
    movementX = 0;
    movementY = 0;
    bgm.pause();
    win.play();
    ball.style.display = "none";
    gameInstruction[0].style.display = "none";
    gameInstruction[1].style.display = "none";
    if (scoreA === 5) {
      gameFinishedMsg[0].style.display = "block";
    } else {
      gameFinishedMsg[1].style.display = "block";
    }
  } else {
    movementY = (3 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
    movementX = (3 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
  }
}

//----------------------------------------------

startBtn.addEventListener("click", startGame);

function startGame() {
  bgm.play();
  bgm.volume = 0.3;
  gameIntro.style.display = "none";
  gameContainer.style.display = "block";
  extra.style.display = "block";
  setInterval(move, 1000 / 60);
}
