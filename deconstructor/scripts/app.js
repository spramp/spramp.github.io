window.onload = function () {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var score = 0;
  var raf;

  var ball = {
  x: 50,
  y: 40,
  vx: 5,
  vy: 4,
  radius: 10,
  color: 'rgba(239, 207, 245, 0.9)',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
  }
};

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



canvas.addEventListener('mousedown', function(e){
  console.log(e.offsetX);
  console.log(e.offsetY);
  console.log(ball.x);
  console.log(ball.y);
  // if Mouse position == ball x and ball y position add one to score
  // if (mousePos.x == ball.x && mousePos.y == ball.y){
  //   score +=1;
  // } else {
  //   console.log("Need To Change Radius");
  // }
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('keydown', function(e){
  window.cancelAnimationFrame(raf);
  });

canvas.addEventListener('mouseover',function(e){
  window.cancelAnimationFrame(raf);
});

ball.draw();

if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
};
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
  ball.vx = -ball.vx;
};
}
  //   function initialize() {
  // 	var canvas = document.getElementById(“canvas”);
  // 	canvas.addEventListener(“mousedown”, doMouseDown, false);
  //
  // }
  //
  // function doMouseDown(event) {
  // 	canvas_x = event.pageX;
  // 	canvas_y = event.pageY;
  // 	alert('X=' + canvas_x + ' Y=' + canvas_y);
  // }


  // ctx.fillStyle = "rgb(200,0,0)";
  // ctx.fillRect (10, 10, 55, 50);
  //
  // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  // ctx.fillRect (30, 30, 55, 50);
  //
  // ctx.strokeStyle = "rgba(216, 235, 241, 1)";
  // ctx.strokeRect(10, 10, 55, 50);



// var ctx = $('#canvas')[0].getContext("2d");
//
// ctx.fillStyle = "#9973dd";
// ctx.beginPath();
// ctx.arc(75,75,50,0,Math.PI*2,true)
// ctx.closePath();
// ctx.fill();
//
// ctx.fillStyle = "#FF1C0A";
// ctx.beginPath();
// ctx.arc(75,75,50,0,Math.PI*2,true)
// ctx.closePath();
// ctx.fill();
// }
//
// var Circle = function() {
//
//   var context = $('#canvas')[0].getContext("2d");
//
//   this.centerX = canvas.width / 2;
//   this.centerY = canvas.height / 2;
//   this.radius = 70;
//   var colour = 'white'; //randomize this
//   var borderColour = 'black';
//
//   context.beginPath();
//   context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
//   context.fillStyle = colour;
//   context.fill();
//   context.lineWidth = 5;
//   context.strokeStyle = borderColour;
//   context.stroke();
//
// }
//
//
// var c = new Circle();
// //c.centerX
// //c.radius
// //c.centerY
//
// var circlesArray = [];
// circlesArray.push(new Circle());
//
// // on canvas event
// // loop through circlesArray
// // calculate if the x,y are inside of a circle
// // add score
//
// var score = 0;
