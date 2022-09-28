const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
ctx.save();

// Audio
const bgaudio = new Audio('assets/sounds/static_assets_sounds_background.ogg');
bgaudio.loop = true;
bgaudio.volume = 0.3;

const winaudio = new Audio('assets/sounds/static_assets_sounds_bonus.ogg');
winaudio.loop = false;
winaudio.volume = 0.3;

// Images
const tank = new Image();
const sprite = new Image();

tank.src = 'assets/tank.png';
sprite.src = './assets/sprite.png';

// Variables
let win = false;
let crash = false;
let move;

const countOfBrownBarier = 8;
const distanceBrownBarier = 35;

const countOfGrayBarier = 7;
const distanceGrayBarier = 45;

// Movement
let isForwardDirection = false;
let isBackDirection = false;
let isLeftDirection = false;
let isRightDirection = false;

// Position coordinates
const tankPosition = {
    dx: 400,
    dy: 540,
    dWidth: 50,
    dHeight: 50,
    step: 2,
}

const yellowWrapPosition = {
    sx: 0, sy: 0,
    sWidth: 75, sHeight: 75,
    dx: 10, dy: 10,
    dWidth: 30, dHeight: 30
}

const bigBrownBarrierPosition = {
    sx: 80, sy: 225,
    sWidth: 190, sHeight: 75,
    dx: 0, dy: 510,
    dWidth: 220, dHeight: 90
}

const bigYellowBarrierPosition = {
    sx: 0, sy: 150,
    sWidth: 75, sHeight: 75,
    dx: 725, dy: 515,
    dWidth: 90, dHeight: 90
}

const littleBrownBarrierPosition = {
    sx: 80, sy: 0,
    sWidth: 180, sHeight: 75,
    dx: 0, dy: 60,
    dWidth: 100, dHeight: 40
}

const littleGrayBarrierPosition = {
    sx: 75, sy: 75,
    sWidth: 75, sHeight: 75,
    dx: 420, dy: 0,
    dWidth: 50, dHeight: 50
}


// --- //

function game() {
    cleanCanvas();

    // Draw big brown barrier
    drawSingleBarrier(bigBrownBarrierPosition);

    // Draw big yellow barrier
    drawSingleBarrier(bigYellowBarrierPosition);

    // Draw yellow wrap
    drawSingleBarrier(yellowWrapPosition);

    // Draw tank
    drawTank();

    // Draw little gray barrier
    drawSeveralBarrier( countOfGrayBarier, distanceGrayBarier, littleGrayBarrierPosition, 'column');

    // Draw little brown barrier
    drawSeveralBarrier( countOfBrownBarier, distanceBrownBarier, littleBrownBarrierPosition);

    checkCrash();

    checkWin();

    if(win) {
        bgaudio.pause();
        winaudio.play();
        return alert('You are the champion');
    }
    

    
    requestAnimationFrame(game, 60);
    
}

sprite.onload = game;

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSingleBarrier(elementPosition) {
    ctx.drawImage(sprite,
        elementPosition.sx, elementPosition.sy,
        elementPosition.sWidth, elementPosition.sHeight,
        elementPosition.dx, elementPosition.dy,
        elementPosition.dWidth, elementPosition.dHeight
    );
}

function drawTank() {
    if(isForwardDirection && tankPosition.dy > 0) { tankPosition.dy -= tankPosition.step }
    if(isBackDirection && tankPosition.dy <= canvas.height - tankPosition.dHeight) { tankPosition.dy += tankPosition.step }
    if(isLeftDirection && tankPosition.dx > 0) { tankPosition.dx -= tankPosition.step }
    if(isRightDirection && tankPosition.dx <= canvas.width - tankPosition.dWidth) { tankPosition.dx += tankPosition.step }
    ctx.save();
    // ctx.translate(canvas.width/2,canvas.height/2);
    // ctx.rotate(90*Math.PI/180);
    ctx.drawImage(tank,
        tankPosition.dx, tankPosition.dy,
        tankPosition.dWidth, tankPosition.dHeight
    );
    ctx.restore();
}

function drawSeveralBarrier(count, distance, elementPosition, direction = 'row') {
    for (let i = 0; i<= count; i++) {
        if(direction === 'column') {
            ctx.drawImage(sprite,
                elementPosition.sx, elementPosition.sy,
                elementPosition.sWidth, elementPosition.sHeight,
                elementPosition.dx, elementPosition.dy + (distance * i),
                elementPosition.dWidth, elementPosition.dHeight,
            );
        } else if(direction === 'row') {
            ctx.drawImage(sprite,
                elementPosition.sx, elementPosition.sy,
                elementPosition.sWidth, elementPosition.sHeight,
                elementPosition.dx + (distance * i), elementPosition.dy,
                elementPosition.dWidth, elementPosition.dHeight,
            );
        }
    }
}

function checkCrash() {
    if((bigBrownBarrierPosition.dx + bigBrownBarrierPosition.sHeight > tankPosition.dx
        && bigBrownBarrierPosition.dy < tankPosition.dy + tankPosition.dHeight)
    || (tankPosition.dx + tankPosition.dWidth > bigYellowBarrierPosition.dx
        && tankPosition.dy + tankPosition.dHeight > bigYellowBarrierPosition.dy)
    || (tankPosition.dy < 365)
        && (tankPosition.dx + tankPosition.dWidth > littleGrayBarrierPosition.dx)
        && (littleGrayBarrierPosition.dx + littleGrayBarrierPosition.dWidth > tankPosition.dx)
    || (tankPosition.dy < littleBrownBarrierPosition.dy + littleBrownBarrierPosition.dHeight)
        && tankPosition.dx < 318
        && tankPosition.dy + tankPosition.dHeight > littleBrownBarrierPosition.dy){
        tankPosition.dx = 400;
        tankPosition.dy = 540;
        tankPosition.dWidth = 50;
        tankPosition.dHeight = 50;
    }
}

function checkWin() {
    if(yellowWrapPosition.dx + yellowWrapPosition.dWidth > tankPosition.dx
        && yellowWrapPosition.dy + yellowWrapPosition.dHeight > tankPosition.dy) {
            win = true;
    }
}



// --- Keyboard Control --- //

document.addEventListener('keydown', pressKeyboard); //press
document.addEventListener('keyup', notPressKeyboard); //not press

function pressKeyboard(EO) {
  EO=EO||window.event;
  if (EO.keyCode === 87) { 
    bgaudio.play();
    isForwardDirection = true;
    }
  if (EO.keyCode === 83) { isBackDirection = true; }
  if (EO.keyCode === 65) { isLeftDirection = true; }
  if (EO.keyCode === 68) { isRightDirection = true; }
}

function notPressKeyboard(EO) {
  EO=EO||window.event;
  if (EO.keyCode === 87) { isForwardDirection = false; }
  if (EO.keyCode === 83) { isBackDirection = false; }
  if (EO.keyCode === 65) { isLeftDirection = false; }
  if (EO.keyCode === 68) { isRightDirection = false; }
}