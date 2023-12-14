/* the home planet is also an object based on this very simple class
*/

function Planet(d){
  this.diameter = d; // from arg
  this.x = width/2; // center on canvas
  this.y = height * 2; // below the canvas
  
  this.display = function(){
    fill(200, 0, 0); // red
		noStroke(); // no outline
    ellipse(this.x, this.y, this.diameter, this.diameter); // it's a big circle
  }
  
  this.shrink = function(n){
    this.diameter -= n; // shrink by amount specified by arg
  }
}