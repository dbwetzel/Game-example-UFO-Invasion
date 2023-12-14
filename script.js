/*
UFO Invasion!

Alien Ships will continue to appear every second. Use the mouse to destroy the ships before they destroy your home planet!

v. 0.2 - shoot enemy ships
v. 0.3 - Start - Play - Game Over; Array of defenders
V. 0.4 - Defender now has to avoid enemy ships
*/

//global variables:
//these will UFO object instances
var ships; // array of ships
var timer; // create a new timer object
var timer2; // create another timer
var interval = 5000; // set the timer interval in milliseconds
var limit = 10; // put a limit on the number of aliens
var home; // home planet object
var score = 0; // initialize score at 0
var defender; // crate a defender
var missiles; //array of missiles

// flags for game status
var start = true;
var play = false;
var gameOver = false;

var clickX = -100;
var clickY = -100;

function setup() {
  // your setup code goes here
  createCanvas(640, 480);
  //startGame(); // too complicated for setup. Plus, now we can reset the game after Game Over
}

function draw(){
  if (start){
    startScreen();
  }
  else if (play){
    playScreen();
  }
  else if(gameOver){
    gameOverScreen();
  }
}

function startScreen(){
  background(0,0,50);
  textAlign(CENTER);
  fill(255);
  textSize(18);
  text("Alien Invasion", width/2, height/3);
  stroke(255);
  strokeWeight(10);
  noFill();
  ellipse(width/2, height/2, 400, 300);
  strokeWeight(1);
  textSize(14);
  fill(255);
  text("Click here to start", width/2, height/2);
  
  if(dist(clickX, clickY, width/2, height/2) < 200){
    play = true;
    start = false;
    gameOver = false;
    startGame();
    clickX = -100;
    clickY = -100;
  }
  
}

function gameOverScreen(){
  background(0,0,50);
  textAlign(CENTER);
  fill(255);
  textSize(18);
  text("Game Over, Man! Game Over!", width/2, height/3);
  stroke(255);
  strokeWeight(5);
  noFill();
  ellipse(width/2, height/2, 400, 300);
  strokeWeight(1);
  textSize(14);
  fill(255);
  text("Play again?", width/2, height/2);
  
  if(dist(clickX, clickY, width/2, height/2) < 200){
    play = true;
    start = false;
    gameOver = false;
    startGame();
  }
  
    // ship movement
  for(var i = 0; i < ships.length; i++){
    ships[i].move(); 
    ships[i].display();
  }

  
}


function startGame(){ // do all the initializing here
  ships = []; // set ships to an empty array
  missiles = [];
   //start with one ship
  ships[0] = new UFO(random(width), 0, 50);
  
  //set and start the timer
  timer = new Timer(interval);
  timer2 = new Timer(2000); //  2-second timer
  timer.start();
  timer2.start();
  
  //make a home planet
  home = new Planet(width * 2);
  
  //create array of defenders
  defender = new Array(3);
  defender[0] = new Defender(width/2, height - height/5);
  
  for(let n = 1; n < defender.length; n++){
    defender[n] = new Defender(width - n * 20, 40);
  }
  
  score = 0; // reset the score
  gameOver = false; // set the gameOver flag to false
  start = false;
  play = true;
  clickX = -100; // reset mouse click point
  clickY = -100;
}

function playScreen() {
  // background is drawn first
  background(0, 0, 50); // deep blue
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text("Your score: " + score, 50, 50);
  home.display(); // display the home planet

  defender[0].display(); // show the defender on screen
  defender[0].move(); //defender responds to arrow keys
  if(keyIsPressed && keyCode === LEFT_ARROW){
    defender[0].angle -= 0.1; // rotate counter clockwise
  }

  if(keyIsPressed && keyCode === RIGHT_ARROW){
    defender[0].angle += 0.1; // rotate clockwise
  }

  if(keyIsPressed && keyCode === UP_ARROW){
    defender[0].thrust(); // accellerate forward
  }
  
  //move and display missiles
  for(let i = 0; i < missiles.length; i++){
    if(missiles[i].live){
      missiles[i].move();
      missiles[i].display();
      for(let j = 0; j < ships.length; j++){
        // hit an enemy ship
        if(dist(missiles[i].x, missiles[i].y, ships[j].x, ships[j].y) < missiles[i].len/2){
          missiles[i].live = false;
          ships.splice(j, 1);
          score++;
        }
      }
    } else {
      missiles.splice(i, 1); // remove the missile
    }
  }
  
  // ship movement
  for(var i = 0; i < ships.length; i++){
    ships[i].move(); 
    ships[i].display();
    // look for collisions with home planet
    if(dist(ships[i].x, ships[i].y, home.x, home.y) < home.diameter/2){
      ships.splice(i, 1); // destroy the ship
      home.shrink(20); // shrink the planet
    }
    // collision with enemy ship
    else if(dist(ships[i].x, ships[i].y, defender[0].x, defender[0].y) < defender[0].d/2){ 
      ships.splice(i, 1); // destroy the ship
      defender.splice(0, 1); // lose a defender
      if(defender.length < 1){
        gameOver = true;
        play = false;
        start = false;
        return; // end this function now
      } else {
        defender[0].x = width/2;
        defender[0].y = height * 4/5;
        defender[0].scaleFactor = 1;
      }
     }
  }
  
  if(home.diameter < width * 1.6) {
    gameOver = true; // end the game
    start = false;
    play = false;
    return; // exit playScreen
  }
  
  for(let n = 1; n < defender.length; n++){
    defender[n].scaleFactor = .5;
    defender[n].display();
  }
  
    
  //every frame of draw(), we check the timer
  if(timer.isFinished()){ // time is up?
    if(ships.length < limit) // limit the array
    {
      var ship = new UFO(random(width), 0, 50);
      ships.push(ship); // create a new UFO and add to the array
    }
    timer.start(); // restart the timer
  }
  
  if(timer2.isFinished()){ // every 2 seconds
    //adjust the downward speed of the ships
    for (var j = 0; j < ships.length; j++){
      if(ships[j].ySpeed > 10){ // speed limit!
        ships[j].ySpeed *= .95; // slow down!
      } else
      ships[j].ySpeed *= 1.2; // add 20% to downward trajectory
      
    }
    timer2.start();
  }

}

function mousePressed(){ // click the mouse to start ships moving
  if(!play){ // if play flag is false
    clickX = mouseX;
    clickY = mouseY;
  }
} // end of mousePressed()

function keyPressed(){
  console.log(keyCode);
  if(keyCode===70){
    let missile = new Missile(defender[0].x, defender[0].y, defender[0].angle);
    missiles.push(missile);
    console.log("Fire! " + missiles.length);
  }
}



