let paused = false;
let space;
const MINX = 0;
const MINY = 0;
let MAXX;
let MAXY;
let hud = true;

function setup() {
	MAXX = windowWidth;
	MAXY = windowHeight;
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
	if (hud === true) {
		showHUD();
	}
}

function keyPressed() {
	if (key == 'Q') {
		paused = !paused;
	}
	if (key == 'T') { space.surface = new Torus(0, 0, width, height); }
	if (key == 'K') { space.surface = new KleinBottle(0, 0, width, height); }
	if (key == 'P') { space.surface = new ProjectivePlane(0, 0, width, height); }
	if (key == 'H') { hud = !hud; }
}

function showHUD() {
	textSize(12);
	fill(255);
	noStroke();
	textAlign(LEFT);
	let shipInfo = `SHIP
Position: (${approx(space.ship.x, 2)},${approx(space.ship.y, 2)})
Velocity: (${approx(space.ship.dx, 2)},${approx(space.ship.dy, 2)})`;
	text(shipInfo, 10, height - 40);
	text(`BULLETS`, 10, 20);
	if (space.ship.bullets.length > 0) {
		for (let i = 0; i < space.ship.bullets.length; i++) {
			text(`${i+1}: (${approx(space.ship.bullets[i].x, 2)},${approx(space.ship.bullets[i].y, 2)})`, 10, 30+10*i);
		}
	} else {
		text(`None`, 10, 30);
	}
	space.surface.draw(width-60, height-40, 60);
}

function approx(val, n) {
	return val.toFixed(n);
}
