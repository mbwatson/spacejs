class Enemy {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.r = 20;
		this.speed = 3 * random();
		this.dx = this.speed * cos(angle);
		this.dy = this.speed * sin(angle);
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;
	}
	draw() {
		noStroke();
		fill(color(255,0,0));
		ellipse(this.x, this.y, this.r, this.r);
	}
	offTopEdge() { return(this.y + this.dy <= MINY && this.dy < 0); }
	offBottomEdge() { return(this.y + this.dy >= MAXY && this.dy > 0); }
	offLeftEdge() { return(this.x + this.dx <= MINX && this.dx < 0); }
	offRightEdge() { return(this.x + this.dx >= MAXX && this.dx > 0); }
}

class Enemies extends Array {
	update() {
		for (let i = this.length - 1; i >= 0; i--) {
			this[i].update();
		}
	}

	draw() {
		for (var enemy of this) {
			enemy.draw();
		}
	}

}