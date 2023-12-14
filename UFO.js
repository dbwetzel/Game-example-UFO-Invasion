// UFO Constructor function
function UFO(tempX, tempY, tempD){
  
  //properties of UFO 
  this.bodyColor = 200;
  this.portholeColor = 0;
  this.pilotColor = color(0, 255, 0);

  this.x = tempX;
  this.y = tempY;
  this.d = tempD;
  this.angle = 0.0;
  this.scaleFactor = 1.0;
  this.rotationSpeed = 0.0;
  this.xSpeed = (random(-2.0, 2.0));
  this.ySpeed = (random(2.0));
  
  //functions of UFO 
  this.move = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if(this.x > width + this.d){
      this.x = 0 - this.d;
    }
    if(this.x < 0 - this.d){
      this.x = width + this.d;
    }
    if(this.y > height + this.d/2){
      this.y = 0 - this.d / 2;
    }
    if(this.y < 0 - this.d / 2){
      this.y = height + this.d / 2;
    }
  }
  
  this.bounce = function(){
    this.xSpeed *= -1.0; // reverse
    this.ySpeed *= -1.0; // reverse
    if(this.rotationSpeed == 0){ //if it's not spinning
      this.rotationSpeed = random(-0.1, 0.1); // start spinning!
    } else {
      this.rotationSpeed *= -1.0; // reverse spin
      this.rotationSpeed *= random(.1, 1.3); 
      //scale speed from 10% - 130%
    }
    this.blink(200); // blink the lights for 200 ms
  }
  
  this.spinOut = function(){ // triggered by mouse press
    this.xSpeed = random(-2.0, 2.0); // set a new x heading
    this.ySpeed = random(-2.0, 2.0); // set a new y heading
    this.rotationSpeed = random(-0.1, 0.1); // start spinning
    this.blink(500); // blink the lights for 500 ms
  }
    
  this.blink = function(blinkTime){
    this.portholeColor = 255; // set color to white
    window.setTimeout(this.lightsOff.bind(this), blinkTime);
    //turn lights off after "blinkTime" in milliseconds
    //window.setTimeout takes over "this", so the "bind" method makes sure you are activating the "lightsOff" function of this UFO. It's complicated. You can read up on the bind() method if you are curious
  }
  
  this.lightsOff = function (){ // called by setTimeout()
    this.portholeColor = 0; // set color back to black
  }
  
  this.display = function(){
    
    var yOffset = this.d/12;
    
    push(); // each UFO gets its own layer
    translate(this.x, this.y); // move the center point
    
    scale(this.scaleFactor);
    
    rotate(this.angle); // roll the ship
    this.angle += this.rotationSpeed; // determing roll speed
    
    //UFO's canopy
    noFill();
    stroke(this.bodyColor);
    strokeWeight(2);
    ellipse(0, yOffset-this.d/6, this.d/2, this.d/2);

    //Pilot
    noStroke();
    fill(this.pilotColor); //green
    // head
    ellipse(0, yOffset-this.d/4, this.d/6, this.d/4);
    
    fill(0); // black
    ellipse(0 - this.d/20, yOffset - this.d/3.5, this.d/18, this.d/10); // left eye
    ellipse(0 + this.d/20, yOffset - this.d/3.5, this.d/18, this.d/10);// right eye
    stroke(0);
    line(0 - this.d/50, yOffset - this.d/5, 0 + this.d/50, yOffset - this.d/5); // mouth(?)

    // UFO's hull
    noStroke();
    fill(this.bodyColor);
    ellipse(0, yOffset, this.d, this.d/3);

    //Port holes
    fill(this.portholeColor);
    ellipse(0 - this.d / 3, yOffset, this.d / 12, this.d / 8);
    ellipse(0, yOffset, this.d / 12, this.d / 8);
    ellipse(0 + this.d / 3, yOffset, this.d / 12, this.d / 8); 
    
    pop(); // dispose of the layer

  }

  
}