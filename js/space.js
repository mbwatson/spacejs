class Space {
	constructor(x1, y1, x2, y2) {
		this.surface = new Torus(x1, y1, x2, y2);
	}
	update() {
		// bullets
		for (var bullet of this.ship.bullets) {
			if (bullet.offTopEdge()) { bullet = this.surface.topEdge(bullet); }
			if (bullet.offBottomEdge()) { bullet = this.surface.bottomEdge(bullet); }
			if (bullet.offLeftEdge()) { bullet = this.surface.leftEdge(bullet); }
			if (bullet.offRightEdge()) { bullet = this.surface.rightEdge(bullet); }
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
		this.enemyHit();
		this.enemies.update();
	}
	draw() {
		this.ship.draw();
		this.enemies.draw();
	}
	enemyHit() {
		for (var enemy of this.enemies) {
			for (var bullet of this.ship.bullets) {
				if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < enemy.r) {
					console.log('HIT!');
				}
			}
		}
	}
}