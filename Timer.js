/*
Timer object constructor function

based on the example by Dan Shiffman for learning Processing: http://learningprocessing.com/examples/chp10/example-10-10-rain-catcher-game

This version is adapted for P5.js and has some enhancements. Note the addition of a display() method that shows the timer as a button with a running display. Also, there is a clickStart() method that starts the timer from the mouse.

Otherwise, it works the same way as the example in Shiffman's book.

initialize a timer with a millisecond value as an argument:
  var myTimer = new Timer(2000);
  
timer object display() method takes x and y positions as args:
  myTimer.display(x, y);
  
  clickStart() method expects a location of a mouse click (x, y), as from mousePressed(), and compares it to the current x, y location of the timer button
*/

function Timer(tempTime){
  this.x = 0;
  this.y = 0;
  this.start = 0;
  this.startTime;
  this.ellapsedTime = 0;
  this.time = tempTime;
  this.running = false;
  
  this.color = color(0, 255, 0);
  
  this.w = 200;
  this.h = 75;
  
  this.start = function(){
    this.startTime = millis(); // get the current clock 
    this.running = true; // set the flag
  }
  
  this.display = function(tempX, tempY){
    this.x = tempX;
    this.y = tempY;
    
    push();
    translate(this.x, this.y);
    
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    
    textAlign(CENTER, CENTER);
    textSize(20);
   
    if(this.running){
      let ellapsedTime = millis() - this.startTime;
      fill(0);
      text(int(ellapsedTime/100)/10, 0, 0);
      this.color = color(255, 0, 0);

      if(ellapsedTime > this.time){
        this.running = false; // off
        this.playSound();
      }
      
    } 
    else {
        fill(0);
        text("Start: " + this.time + " ms", 0, 0);
        this.color = color(0, 255, 0);
    }
    pop();
  }
  
  this.clickStart = function(clickX, clickY){
    let clickedMe = false;
    
    if(clickX < this.x + this.w/2 && clickX > this.x - this.w/2 && clickY < this.y + this.h/2 && clickY > this.y - this.h/2){
        clickedMe = true;
    }
    if(clickedMe){
      this.start(); // get the current clock
      this.running = true; // set status
    }  
  }
  
  this.isFinished = function(){
    let ellapsedTime = millis() - this.startTime;
    if (ellapsedTime > this.time) {
      this.running = false;
      return true; // time's up!
    } else {
      return false;// time's not up yet
    }
  }
  
  this.playSound = function(){
    // sound effect coming soon
  }
   
}