
class Bullet {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.speed = 10;
		this.dx = this.speed * cos(angle);
		this.dy = this.speed * sin(angle);
		this.alpha = 255;
		this.r = 4;
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
		for (let i = 0; i < this.length; i++) {
			this[i].draw();
		}
	}

}
