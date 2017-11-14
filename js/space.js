class Space {
	constructor(x1, y1, x2, y2) {
		this.surface = new ProjectivePlane(x1, y1, x2, y2);
	}
	update() {
		// ship
		if (this.ship.offTopEdge()) { this.ship = this.surface.topEdge(this.ship); }
		if (this.ship.offBottomEdge()) { this.ship = this.surface.bottomEdge(this.ship); }
		if (this.ship.offLeftEdge()) { this.ship = this.surface.leftEdge(this.ship); }
		if (this.ship.offRightEdge()) { this.ship = this.surface.rightEdge(this.ship); }
		// bullets
		for (let i = 0; i < this.ship.bullets.length; i++) {
			if (this.ship.bullets[i].offTopEdge()) { this.ship.bullets[i] = this.surface.topEdge(this.ship.bullets[i]); }
			if (this.ship.bullets[i].offBottomEdge()) { this.ship.bullets[i] = this.surface.bottomEdge(this.ship.bullets[i]); }
			if (this.ship.bullets[i].offLeftEdge()) { this.ship.bullets[i] = this.surface.leftEdge(this.ship.bullets[i]); }
			if (this.ship.bullets[i].offRightEdge()) { this.ship.bullets[i] = this.surface.rightEdge(this.ship.bullets[i]); }
		}
		this.ship.update();
	}
	draw() {
		this.ship.draw();
	}
}