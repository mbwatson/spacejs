class Game {
	constructor() {
		this.space = '';
		this.visibleHUD = true;
		this.paused = false;
		this.state = 0;
		// 0 - welcome screen
		// 1 - playing
		// 2 - game over
	}
	draw() {
		this.space.surface.decorate();
		if (this.visibleHUD) { this.showHUD(); }
		this.space.draw();
	}
	spawnEnemy() {
		this.space.enemies.push(new Enemy(random(width),random(height), random(60)*PI/60));
	}
	pause() { this.paused = true; }
	unPause() { this.paused = false; }
	showWelcomeScreen() {
		stroke(0);
		fill(255);
		textAlign(CENTER);
		textSize(92);
		text("SPACE", width/2, height/2-80);
		textSize(20);
		fill( round(127*(1+sin(millis()/200))) );
		text("Press any key to begin!", width/2 - 150, height/2 + 200, 300, 100);
	}
	showPauseScreen() {
		textSize(24);
		textAlign(CENTER);
		let alpha = round(255-63*(1+sin(millis()/200)));
		stroke(color(255, 255, 255, alpha));
		fill(color(255, 255, 255, alpha));
		text("PAUSED", width/2, height/2-100);
		this.showGameControls();
	}
	showGameControls() {
		textAlign(CENTER);
		noStroke();
		fill(255);
		textSize(12);
		textStyle(BOLD);
		text('SHIP CONTROLS', width/2 - 200, height/2 + 50);
		textStyle(NORMAL);
		text(`
Left and Right - Turn
Up - Thrust`, width/2-200, height/2 + 50);
		textStyle(BOLD);
		text('CHANGE SURFACES', width/2, height/2 + 50);
		textStyle(NORMAL);
		text(`
T - Torus
K - Klein Bottle
P - Projetive Plane`, width/2, height/2 + 50);
		textStyle(BOLD);
		text('GAME CONTROL', width/2 + 200, height/2 + 50);
		textStyle(NORMAL);
		text(`
ESC - Pause
H - Toggle HUD`, width/2 + 200, height/2 + 50);
	}
	showHUD() {
		textSize(12);
		fill(255);
		noStroke();
		textAlign(LEFT);
		let shipInfo = `SHIP
Position: (${approx(this.space.ship.x, 2)},${approx(this.space.ship.y, 2)})
Velocity: (${approx(this.space.ship.dx, 2)},${approx(this.space.ship.dy, 2)})`;
		text(shipInfo, 10, height - 40);
		text(`BULLETS`, 10, 20);
		if (this.space.ship.bullets.length > 0) {
			for (let i = 0; i < this.space.ship.bullets.length; i++) {
				text(`${i+1}: (${approx(this.space.ship.bullets[i].x, 2)},${approx(this.space.ship.bullets[i].y, 2)})`, 10, 30+10*i);
			}
		} else {
			text(`None`, 10, 30);
		}
		textAlign(RIGHT);
		text(`ENEMIES`, width - 10, 20);
		if (this.space.enemies.length > 0) {
			for (let i = 0; i < this.space.enemies.length; i++) {
				text(`${i+1}: (${approx(this.space.enemies[i].x, 2)},${approx(this.space.enemies[i].y, 2)})`, width - 10, 30+10*i);
			}
		} else {
			text(`None`, width - 10, 30);
		}
		this.space.surface.draw(width-60, height-40, 60);
	}
}
