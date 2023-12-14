/** Missile constructor */
function Missile(x, y, angle){
	this.x = x; // arg 1
	this.y = y; // arg 2
	this.angle = angle; // arg 3
	this.xSpeed = 6 * Math.sin(angle); // based on angle of the ship
	this.ySpeed = -6 * Math.cos(angle);
	this.len = 20; // missile length
	this.live = true; // track the missile
	
	this.move = function(){

		// update location
    this.x += this.xSpeed; 
		this.y += this.ySpeed;
		
		//if the missile is off the screen, kill it
		if(this.x > width || this.x < 0 || this.y < 0 || this.y > height){
			this.live = false;
		}
	}
	
	this.display = function(){
		push();
		translate(this.x, this.y);
		rotate(this.angle);
		
		fill(0, 255, 0, 100);
		rectMode(CENTER);
		rect(0, 0, this.len/10, this.len);
		
		pop();
	}
}