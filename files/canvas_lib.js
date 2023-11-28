const Width   = window.innerWidth;
const Height  = window.innerHeight;
const canvas  = document.getElementById("Canvas");
canvas.width  = Width-2;
canvas.height = Height-2;
const Canvas  = canvas.getContext("2d");


canvas.addEventListener("mousemove", mouseCoors);
canvas.addEventListener("mousedown", mousePressed);
canvas.addEventListener("mouseup"  , mouseReleased);

let mouseX, mouseY;
let mousePress;

let PI = Math.PI;
let PI2 = PI*2;

function mouseCoors(e) {
	mouseX = e.clientX - canvas.getBoundingClientRect().left;
	mouseY = e.clientY - canvas.getBoundingClientRect().top;
}

function mousePressed() {
	mousePress = true;
}

function mouseReleased() {
	mousePress = false;
}


function background(colour) {
	restore();
	rect(0, 0, Width, Height);
	fill(colour);
	save();
}

function rotate(amount) {
	Canvas.rotate(amount);
}

function translate(x, y) {
	Canvas.translate(x, y);
}

function save() {
	Canvas.save();
}

function restore() {
	Canvas.restore();
}

/*
------------
   Colour
------------
*/
function fill(colour) {
	Canvas.fillStyle = colour;
	Canvas.fill();
}

function stroke(colour) {
	Canvas.strokeStyle = colour;
	Canvas.stroke();
}

function strokeWeight(weight) {
	Canvas.lineWidth = weight;
}

/*
------------
   Shapes
------------
*/
function rect(x, y, w, h) {
	Canvas.beginPath();
	Canvas.rect(x, y, w, h);
}

function line(x1, y1, x2, y2) {
	Canvas.beginPath();
	Canvas.moveTo(x1, y1);
	Canvas.lineTo(x2, y2);
}

function arc(x, y, r, start=0, end=(Math.PI*2)) {
	Canvas.beginPath();
	Canvas.arc(x, y, Math.abs(r), start, end);
}

function ellipse(x, y, rX, rY, rotation=0, start=0, end=(Math.PI*2)) {
    Canvas.beginPath();
    Canvas.ellipse(x, y, rX, rY, rotation, start, end);
}


/*
-------------------------------
  Additional Helpful Functions
-------------------------------
*/
function random(a, b) {
	return (Math.random() * ((b-a)+1)) + a;
}

function floor(n) {
	return Math.floor(n);
}

function ceil(n) {
	return Math.ceil(n);
}