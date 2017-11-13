let ship;
let paused = false;
let space;

function setup() {
	createCanvas(600,600);
	space = new Space(0, 0, width, height);
	ship = new Ship(width/2, height/2);
}

function draw() {
	background(0);
	if (!paused) {
		ship.update();
	}
	ship.draw();
}

function keyPressed() {
	if (key == 'P') {
		paused = !paused;
	}
}