//----------------------paddle 1-------------------------------------

const paddle = document.querySelector("#paddle1");

let position = container.offsetHeight / 2;
let direction = 0;

document.onkeydown = (event) => {
  console.log("keydown", event.code);
  switch (event.code) {
    case "ArrowDown":
      direction = 1;
      break;
    case "ArrowUp":
      direction = -1;
      break;
  }
};

document.onkeyup = (event) => {
  console.log("keyup", event.code);
  switch (event.code) {
    case "ArrowDown":
      if (direction == 1) direction = 0;
      break;
    case "ArrowUp":
      if (direction == -1) direction = 0;
      break;
  }
};

//------------------paddle 2-----------------------------------------

const paddle2 = document.querySelector("#paddle2");

let position2 = container.offsetHeight / 2;
let direction2 = 0;

document.onkeydown = (event) => {
  console.log("keydown", event.code);
  switch (event.code) {
    case "KeyS":
      direction2 = 1;
      break;
    case "KeyW":
      direction2 = -1;
      break;
    case "ArrowDown":
      direction = 1;
      break;
    case "ArrowUp":
      direction = -1;
      break;
  }
};

document.onkeyup = (event) => {
  console.log("keyup", event.code);
  switch (event.code) {
    case "KeyS":
      if (direction2 == 1) direction2 = 0;
      break;
    case "KeyW":
      if (direction2 == -1) direction2 = 0;
      break;
    case "ArrowDown":
      if (direction == 1) direction = 0;
      break;
    case "ArrowUp":
      if (direction == -1) direction = 0;
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

let scoreA = 0;
let scoreB = 0;

let playerAscore = document.getElementById("paddle1");
function scoreForB() {
  if (scoreA < 5) {
    scoreA++;

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

    ding.play();
    Player2.innerText = scoreB;
  } else {
  }
  resetBall();
}

//---------------ball  movement---------------------------------

const ball = container.querySelector("#ball");

let x = 500;
let y = 300;

let movementY = 5;
let movementX = 5;

function move() {
  if (y + 100 >= 700 || y <= 0) {
    movementY *= -1;
  }

  if (x + 100 >= 1120) scoreForB();
  if (x <= 0) scoreForA();

  paddleGlobal.forEach((p) => {
    const collides = ballCollidesWithPaddle(
      p.offsetLeft,
      p.offsetTop,
      p.offsetWidth,
      p.offsetHeight
    );

    if (collides) {
      pop.play();
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
setInterval(move, 1000 / 60);

//-------------------------reset function----------

function resetBall() {
  x = container.offsetWidth / 2;
  y = container.offsetHeight / 2;
  if (scoreA === 5 || scoreB === 5) {
    movementX = 0;
    movementY = 0;
  } else {
    movementY = (3 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
    movementX = (3 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
  }
}

// --------collision-------------------------------------

function ballCollidesWithPaddle(left, top, width, height) {
  return (
    x > left - 20 &&
    x < left + width && // right
    y > top - 20 &&
    y < top + height // bottom
  );
}

let paddleGlobal = [paddle, paddle2];

//-----------sound effect---------------------------------------

// var playSound = function () {
//   audio.play();
// };

// var playSound = dodio(/audio/ding.wav");cument.getElementById("audio");

let pop = document.getElementById("pop");
let ding = document.getElementById("ding");
