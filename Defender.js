/*
Defender: This is a basic defender ship that represents the player on screen. 
*/

function Defender(xPos, yPos){
  this.d = 40; // fixed diameter
  this.x = xPos; // from arg 1
  this.y = yPos; // from arg 2
	this.xSpeed = 0; // don't move yet
	this.ySpeed = 0;
	this.angle = 0; // pointing up
	this.accel = false; // not moving
	this.scaleFactor = 1;
  
  this.move = function(){
    this.x += this.xSpeed; // horiz movement
    this.y += this.ySpeed; // vert movement 
		
		if(this.x > width)
			this.x = 0; // wrap around to left
		if(this.x < 0)
			this.x = width; // wrap around to right
		if(this.y > height)
			this.y = 0; // wrap to top
		if(this.y < 0)
			this.y = height; // wrap to bottom
  }
	
	this.thrust = function(){
		this.horz = Math.sin(this.angle); // number between -1 an 1
		this.vert = Math.cos(this.angle); // number from -1 to 1
		//use these as a multiplier to the xSpeed and ySpeed
		this.xSpeed += .05 * this.horz; // accelerate horizontally
		this.ySpeed -= .05 * this.vert; // accelerate vertically
		this.accel = true; // set flag for rocket animation
	}
  
  this.display = function(){
		push(); // create a drawing layer
		
		translate(this.x, this.y); // move the layer's origin (0,0) to a point on the canvas
		scale(this.scaleFactor); // grow/shrink
		rotate(this.angle); // rotate
    noStroke();
		rectMode(CENTER);
		fill(0, 0, 200); // blue
		triangle(0, -this.d/3, -this.d/2, this.d/2, this.d/2, this.d/2); // wings
		fill(0, 200, 0); // green
		triangle(0, -this.d/2, -this.d/4, 0, this.d/4, 0); //nose
		rect(0, 0+this.d/4, this.d/2, this.d/2); // hull
		fill(0, 0, 255); // blue
		ellipse(0, 0, this.d/4, this.d/2);//canopy
		// rocket burner
    if(this.accel){
			fill(255, 0, 0, 100);
			noStroke();
			fill(255, 0, 0, 100); // transparent red
			ellipse(0, this.d/2 + 10, 15, 20);
			fill(255, 255, 0, 100); // yellow
			ellipse(0, this.d/2 + 5, 10, 15);
			this.accel = false; // turn off burner
		}
		
		pop(); // dispose of the layer
  }

}