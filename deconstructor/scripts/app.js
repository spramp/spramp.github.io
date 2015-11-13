// Jan Christian Bernabe comments
window.onload = function () {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var score = 0;
  var raf;

// Find upper left position of canvas for correcting the mouse coordinates (see below)

  var canvasOffset=$("#canvas").offset();
  var offsetX=canvasOffset.left;
  var offsetY=canvasOffset.top;

// Make the canvas as large as defined in the style sheet, otherwise you stretch the canvas from its default size
// to whatever you defined in the css. You should not size the canvas via css as it has a default value of 300px and 150px.
// This will screw up the display and the coordinates of mouse actions. It will also screw up the resultion of the ball.

  canvas.width = 700;
  canvas.height = 555;

// Below defines the object as 'ball' with properties and a method that can be called to draw/paint it on the canvas
// using the properties defined for the object
  var ball = {
  x: 50,
  y: 40,
  vx: 3,
  vy: 2,
  radius: 30,
  color: 'rgba(239, 207, 245, 0.9)',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.mozImageSmoothingEnabled = true;
    //ctx.webkitImageSmoothingEnabled = true;
    CanvasRenderingContext2D.imageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
  }
};

// Below defines the function 'draw()' that does the following
// (1) draws a blank canvas with some given color
// (2) use the draw() method of the ball object to draw the ball
// (3) check whether the balls coordinates are outside the canvas area
//     -> if yes - reverse the direction of the ball by inverting the
//     sign on the ball.vx and ball.vy step size parameters
// (4) advancing the ball's position by ball.vx and ball.vy (which can
//     be either positive or negative
// (5) recursivly calling itself to create an animation by executing
//     the draw() function over and over again with

function draw() {
  ctx.fillStyle = 'rgba(128, 201, 255, 0.4)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  };
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  };
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
};

// Below starts the animation by requesting an AnimationFrame with the recursivly
// defined function draw().

raf = window.requestAnimationFrame(draw);

// Now define some eventListeners that will execute commands if, e.g.,a mouse button was pressed,
// the mouse moved over the canvas, etc. Remember NOT TO CALL requestAnimationFrame(draw) again, as it speeds up
// the velocity of the ball. My theory is that by calling it again, the recursiveness redraws the canvas and ball over
// and over, each time adding to the initial velocity of the ball. You can stop the
// animation however by using 'window.cancelAnimationFrame(raf)''

canvas.addEventListener('mouseout', function(e){
  // This slows down the ball as velocity xy is divided by half.
  ball.vx = ball.vx*1/2;
  ball.vy = ball.vy*1/2;
});

canvas.addEventListener('mouseover', function(e){
  // This doubles the speed of the ball as the veolocity vy is multiplied by two.
  ball.vx = ball.vx*2;
  ball.vy = ball.vy*2;
});

canvas.addEventListener('mousedown',function(e){
  // Below finds the canvas coordinates of mouse pointer.
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

// Below checks whether the ball is caught inside of its defined area
// I used sqrt((x-x0)^2 + (y-y0)^2) [difference between the separation between click coordinate and center of ball]. I used
// the Pythagorean theorem to solve for the radius.  The distance between the the center of the ball and where you clicked
// should be smaller than the radius, thus the formula below measures the true separation between click and ball center. The
// defines a circle and the space in which the click point will or will not let the player win the unicorn.

  if (Math.sqrt(Math.pow((mouseX - (ball.x-ball.vx)),2) + Math.pow((mouseY - (ball.y-ball.vy)),2)) <= ball.radius){
      //score +=1;
      window.cancelAnimationFrame(raf);
      $('#unicorn').css("background-image", "url(http://www.janchristianbernabe.com/wp-content/uploads/2015/11/unicorn.jpg)");
      alert('WINNER! Enjoy your pink unicorn!');
  }
});

};
