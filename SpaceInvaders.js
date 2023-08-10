var canvas;
var c;
var midx;
var midy;
var pi = Math.PI;
var Invader = [];
var InvaderType = [];
var InvaderVersion = [];
var Mothership;
var x = [0, 100, 200, 300, 400, 500, 600];
var y = [100, 100, 100, 100, 100, 100, 100];
var xtwo = [0, 100, 200, 300, 400, 500, 600];
var ytwo = [200, 200, 200, 200, 200, 200, 200];
var xthree = [0, 100, 200, 300, 400, 500, 600];
var ythree = [300, 300, 300, 300, 300, 300, 300];
var name;
var count = 0;
var counttwo = 0;
var countthree = 0;
var xscale = .5;
var runx = 0;
var runy = 0;
var SPACE = 32;
var ENTER = 13;
var LEFT = 37;
var RIGHT = 39;
var keystroke_push = false;
var speed = 10; // laser speed
var dx = speed;
var dy = speed;
var dx1 = 1;
var dy1 = 1;
var runx = -50;
var runy = 375;
var base = { x: 365, y: 585, length: 80, width: 17 };
var gun = { x: 370, y: 580, length: 70, width: 5 };
var guntwo = { x: 395, y: 565, length: 20, width: 15 };
var gunthree = { x: 401.5, y: 557, length: 7.5, width: 10 };
var timer = 0;
var lasercolors = ["blue", "red", "green"];
var start;
var laser = { x: gun.x + 33, y: gun.y - 11, length: 5, width: 10 };
var sound = new Audio("shoot.wav");
var death = new Audio("invaderkilled.wav");

var invaderLaser = { x: 0, y: 0, length: 5, width: 10, active: false };

var gameStarted = false;


var number_of_kills = 0;

function initialize() {

  canvas = document.getElementById("canvas");
  Mothership = document.getElementById("Mothership");

  // looping through the images
  for (var i = 0; i < 2; i++) {
    name = "Invader" + (i + 1); // Name of the image
    Invader[i] = document.getElementById(name);
  }
  // looping through the images
  for (var i = 0; i < 2; i++) {
    name = "InvaderType" + (i + 1); // Name of the image
    InvaderType[i] = document.getElementById(name);
  }

  // looping through the images
  for (var i = 0; i < 2; i++) {
    name = "InvaderVersion" + (i + 1); // Name of the image
    InvaderVersion[i] = document.getElementById(name);
  }

  // setting up the canvas
  if (canvas && canvas.getContext) {
    c = canvas.getContext("2d");

    // event listener for key presses
    window.addEventListener("keydown", keystroke);

    // Center of screen

    start = true;

    midx = canvas.width / 2;
    midy = canvas.height / 2;


    //drawScreen();   // call the function to draw once
    setInterval(drawScreen, 20); // call repeatedly

  } // end if
} // initialize()

// draw the screen
function drawScreen() {

  // Background

  c.beginPath();
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.closePath();

  // drawing the mothership
  c.drawImage(Mothership, 0, 0)
  c.drawImage(Mothership, 685, 0)
  c.drawImage(Mothership, 0, 550)
  c.drawImage(Mothership, 685, 550)

  timer++;
  if (timer % 30 == 0) // having the invaders move 1 frame every 15 frames
  {
    count++;
    if (count > 1) { count = 0; }
  }
  // moving the invaders left or right
  for (var i = 0; i < x.length; i++) {

    if (x[i] >= 750) {
      dx1 = -dx1;
    }
    if (x[i] <= -10) {
      dx1 = -dx1;
    }
    x[i] = x[i] + dx1;
  }

  if (gameStarted) {
    invaderShoot();
    drawInvaderLaser();
    move();
  }

  stars();
  drawInvader();
  drawLaser();
  drawGun();

  // keeping track of the number of kills
  console.log(number_of_kills);

  // if the player has won
  if (number_of_kills == 21) {
    alert("You Win!");
    number_of_kills == 0;
    window.location.reload();
  }

} // end drawScreen

/** draw the player **/
function drawGun() {
  c.beginPath();
  c.fillStyle = '#36e800';
  c.rect(base.x, base.y, base.length, base.width);
  c.rect(gun.x, gun.y, gun.length, gun.width);
  c.rect(guntwo.x, guntwo.y, guntwo.length, guntwo.width);
  c.rect(gunthree.x, gunthree.y, gunthree.length, gunthree.width);
  c.fill();
  c.closePath();
}

// function to shoot the laser
function move() {

  // make laser shoot up from player 
  if (keystroke_push == true) {
    if (laser.y == gun.y - 11) { // Check if the laser is in its initial position
      sound.play();
    }
    laser.y = laser.y - dy;
  }

  // keep gun on screen
  if (base.x > 800 || base.x < 0) {
    gun.x = 370;
    guntwo.x = 395;
    gunthree.x = 401.5;
    base.x = 365;
    laser.x = gun.x + 33;
  }

  // replace laser in gun
  if (laser.y < 0) {
    keystroke_push = false;
    laser.x = gun.x + 33;
    laser.y = gun.y - 11;
  }

}

function keystroke(key) { // START KEYSTROKE

  switch (key.keyCode) //key.keyCode = code for key password
  {
    case ENTER:
      gameStarted = true;
      document.getElementById("instructions").style.display = "none"; // hide the instructions
      break;
    case LEFT:
      gun.x = gun.x - 20;
      guntwo.x = guntwo.x - 20;
      gunthree.x = gunthree.x - 20;
      base.x = base.x - 20;
      if (keystroke_push == false) {
        laser.x = laser.x - 20;
      }
      break;
    case RIGHT:
      gun.x = gun.x + 20;
      guntwo.x = guntwo.x + 20;
      gunthree.x = gunthree.x + 20;
      base.x = base.x + 20;
      if (keystroke_push == false) {
        laser.x = laser.x + 20;
      }
      break;
    case SPACE:
      console.log("space");
      if (keystroke_push == false) { // Only change the value if it's currently false
        keystroke_push = true;
      }
      break;
  }
} // end keystroke


function stars() {

  // Making stars

  c.fillStyle = "white";
  for (var i = 1; i <= 10; i++) {
    c.beginPath();
    xfour = Math.floor(canvas.width * Math.random());
    yfour = Math.floor(canvas.height * Math.random());
    c.arc(xfour, yfour, 1, 0, 2 * pi);
    c.fill();
    c.closePath();
  }
}

function checkCollision(xa, ya, wa, ha) {
  var ra = xa + wa;
  var ta = ya + ha;
  /*if ( xa < laser.x && ra > laser.x ) {
   console.log( "L("+laser.x+","+laser.y+") I("+xa+","+ya+" - "+ra+","+ta+")");
   }
   */
  return !(xa > laser.x || ra < laser.x || ya > laser.y || ta < laser.y);

}

function drawInvader() { // moving and animating the images	  	  

  c.save();
  //c.scale(xscale, 0.5);
  c.beginPath();

  for (var i = 0; i < x.length; i++) {
    if (y[i] >= 0) {
      c.drawImage(Invader[count], x[i], y[i]);
      if (keystroke_push) {
        if (checkCollision(x[i], y[i], Invader[count].width, Invader[count].height)) {
          //console.log("hit 1 : Laser("+laser.x+","+laser.y+") I("+ x[i]+","+y[i]+","+Invader[count].width+","+Invader[count].height+")");
          number_of_kills++;
          y[i] = -100;
          death.play();
          keystroke_push = false;
          laser.y = gun.y - 11;
        }
      }
    }

    if (ytwo[i] >= 0) {
      c.drawImage(InvaderType[count], x[i], ytwo[i]);
      if (keystroke_push) {
        if (checkCollision(x[i], ytwo[i], InvaderType[count].width, InvaderType[count].height)) {
          //console.log("hit 2 : Laser("+laser.x+","+laser.y+") I("+ x[i]+","+y[i]+","+InvaderType[count].width+","+InvaderType[count].height+")");
          number_of_kills++;
          ytwo[i] = -100;
          death.play();
          keystroke_push = false;
          laser.y = gun.y - 11;
        }
      }
    }

    if (ythree[i] >= 0) {
      c.drawImage(InvaderVersion[count], x[i], ythree[i]);
      if (keystroke_push) {
        if (checkCollision(x[i], ythree[i], InvaderVersion[count].width, InvaderVersion[count].height)) {
          //console.log("hit 3 : Laser("+laser.x+","+laser.y+") I("+ x[i]+","+y[i]+","+InvaderVersion[count].width+","+InvaderVersion[count].height+")");
          number_of_kills++;
          ythree[i] = -100;
          death.play();
          keystroke_push = false;
          laser.y = gun.y - 11;
        }
      }
    }
  }
} // end of drawInvaders

function invaderShoot() {
  if (!invaderLaser.active) {
    var randomInvader = Math.floor(Math.random() * x.length); // Random invader shoots.
    invaderLaser.x = x[randomInvader] + Invader[count].width / 2;
    invaderLaser.y = y[randomInvader] + Invader[count].height;
    invaderLaser.active = true;
  }
}

function checkCollisionWithPlayer(xa, ya, wa, ha) {
  var ra = xa + wa;
  var ta = ya + ha;
  return !(xa > base.x + base.length || ra < base.x || ya > base.y + base.width || ta < base.y);
}

function drawInvaderLaser() {
  if (invaderLaser.active) {
    c.beginPath();
    c.fillStyle = "red";
    c.fillRect(invaderLaser.x, invaderLaser.y, invaderLaser.length, invaderLaser.width);
    c.closePath();

    invaderLaser.y += dy; // move the laser downwards

    // Check if laser goes out of the canvas
    if (invaderLaser.y > canvas.height) {
      invaderLaser.active = false;
    }

    // Check if laser hits the player
    if (checkCollisionWithPlayer(invaderLaser.x, invaderLaser.y, invaderLaser.length, invaderLaser.width)) {
      alert("You were hit!");
      window.location.reload();
    }
  }
}

/** draw the laser from the gun*/
function drawLaser() {
  //for(var i = 0; i < 3; i++)
  //{
  c.beginPath();
  c.fillStyle = "rgb(255, 0, 255)";
  c.fillRect(laser.x, laser.y, laser.length, laser.width);
  c.closePath();

  //}
}