let ship;
let paused = false;
let space;
const MINX = 0;
const MAXX = 600;
const MINY = 0;
const MAXY = 600;


function setup() {
	createCanvas(MAXX, MAXY);
	space = new Space(0, 0, width, height);
	space.ship = new Ship(width/2, height/2);
}

function draw() {
	background(0);
	if (!paused) {
		space.update();
	}
	space.draw();
}

function keyPressed() {
	if (key == 'P') {
		paused = !paused;
	}
	if (key == 'T') { space.surface = new Torus(0, 0, width, height); }
	if (key == 'K') { space.surface = new KleinBottle(0, 0, width, height); }
	if (key == 'P') { space.surface = new ProjectivePlane(0, 0, width, height); }
}