class Bullet {
	constructor(x, y, speed, angle) {
		this.x = x;
		this.y = y;
		this.speed = 10 + speed;
		this.dx = this.speed * cos(angle);
		this.dy = this.speed * sin(angle);
		this.alpha = 255;
		this.r = 4;
		this.minx = 1;
		this.maxx = width - 1;
		this.miny = 1;
		this.maxy = height - 1;
	}
	draw() {
		noStroke();
		fill(color(0, 255, 255, this.alpha));
		ellipse(this.x, this.y, this.r, this.r);
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.alpha -= 5;
	}
	isDead() {return this.alpha <= 0; }
	offTopEdge() { return(this.y + this.dy <= MINY && this.dy < 0); }
	offBottomEdge() { return(this.y + this.dy >= MAXY && this.dy > 0); }
	offLeftEdge() { return(this.x + this.dx <= MINX && this.dx < 0); }
	offRightEdge() { return(this.x + this.dx >= MAXX && this.dx > 0); }
}

class Bullets extends Array {
	update() {
		for (let i = this.length - 1; i >= 0; i--) {
			if (this[i].alpha <= 0) {
				this.splice(i,1);
			} else {
				this[i].update();
			}
		}
	}

	draw() {
		for (var bullet of this) {
			bullet.draw();
		}
	}

}
