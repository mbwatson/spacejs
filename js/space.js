class Space {
	constructor(x1, y1, x2, y2) {
		this.surface = new Torus(x1, y1, x2, y2);
	}
	update() {
		// bullets
		for (let i = 0; i < this.ship.bullets.length; i++) {
			if (this.ship.bullets[i].offTopEdge()) { this.ship.bullets[i] = this.surface.topEdge(this.ship.bullets[i]); }
			if (this.ship.bullets[i].offBottomEdge()) { this.ship.bullets[i] = this.surface.bottomEdge(this.ship.bullets[i]); }
			if (this.ship.bullets[i].offLeftEdge()) { this.ship.bullets[i] = this.surface.leftEdge(this.ship.bullets[i]); }
			if (this.ship.bullets[i].offRightEdge()) { this.ship.bullets[i] = this.surface.rightEdge(this.ship.bullets[i]); }
		}
		// ship
		if (this.ship.offTopEdge()) { this.ship = this.surface.topEdge(this.ship); }
		if (this.ship.offBottomEdge()) { this.ship = this.surface.bottomEdge(this.ship); }
		if (this.ship.offLeftEdge()) { this.ship = this.surface.leftEdge(this.ship); }
		if (this.ship.offRightEdge()) { this.ship = this.surface.rightEdge(this.ship); }
		this.ship.update();
		// enemies
		for (var enemy of this.enemies) {
			if (enemy.offTopEdge()) { enemy = this.surface.topEdge(enemy); }
			if (enemy.offBottomEdge()) { enemy = this.surface.bottomEdge(enemy); }
			if (enemy.offLeftEdge()) { enemy = this.surface.leftEdge(enemy); }
			if (enemy.offRightEdge()) { enemy = this.surface.rightEdge(enemy); }
		}
		this.enemies.update();
	}
	draw() {
		this.ship.draw();
		this.enemies.draw();
	}
}