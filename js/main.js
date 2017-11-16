const MINX = 0;
const MINY = 0;
let MAXX;
let MAXY;
let game;

function setup() {
	MAXX = windowWidth;
	MAXY = windowHeight;
	createCanvas(MAXX, MAXY);
	game = new Game();
	game.space = new Space(0, 0, width, height);
	game.space.ship = new Ship(width/2, height/2);
}

function draw() {
	switch(game.state) {
		case 0: // welcome screen
			game.space.surface.decorate();
			game.showWelcomeScreen();
			break;
		case 1: // playing
			// draw
			game.space.surface.decorate();
			if (game.visibleHUD) { game.showHUD(); }
			game.space.ship.draw();
			if (game.paused === true) {
				game.showPauseScreen();
			} else {
				game.space.update();
			}
			break;
		case 2: // game over
			// this.space.gameOverScreen();
			break;
		default:
			break;
	}
}

function keyPressed() {
	// If on welcome screen
	if (game.state == 0) {
		// start game
		game.state = 1;
	} else {
		// (Un)pause
		if (keyCode === ESCAPE) {
			game.paused = !game.paused;
		}
	  // game control
		if (key == 'H') { game.visibleHUD = !game.visibleHUD; }
		if (key == 'R') {  }
		  // surface change
		if (key == 'T') { game.space.surface = new Torus(0, 0, width, height); }
		if (key == 'K') { game.space.surface = new KleinBottle(0, 0, width, height); }
		if (key == 'P') { game.space.surface = new ProjectivePlane(0, 0, width, height); }
	}
}

// Misc functions

function approx(val, n) {
	return val.toFixed(n);
}
